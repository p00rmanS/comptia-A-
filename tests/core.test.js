import {matchesLesson,missedChecks,practicePool,matchesPorts,completedCount,nextCheckIndex,shuffled,practiceSession} from '../src/learning.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,domains,ports,questionFor} from '../src/data.js';
import {checksFor,questionCount} from '../src/checks.js';
import {readState,accuracy,streak,localDate} from '../src/storage.js';

test('curriculum has complete, unique lessons and balanced domain metadata',()=>{
 assert.equal(domains.reduce((n,d)=>n+d.weight,0),100);
 assert.equal(new Set(lessons.map(l=>l.id)).size,47);
 for(const d of domains)assert.ok(lessons.some(l=>l.domain===d.id));
 for(const l of lessons){assert.ok(l.title.length>3);for(const field of ['big','taglish','analogy','exam','tech','explanation','tip'])assert.ok(l[field]?.length>15,`${l.id}: ${field}`);assert.ok(l.flow.length>=3);}
});
test('all 141 original checks have a single correct choice after rotation',()=>{
 assert.equal(questionCount,141);
 for(const l of lessons){assert.equal(checksFor(l).length,3);for(const check of checksFor(l)){const q=questionFor(check);assert.equal(q.choices.filter(c=>c.correct).length,1);assert.equal(q.choices.find(c=>c.correct).text,check.options[0]);assert.equal(new Set(check.options).size,3);assert.ok(check.explanation.length>40);}}
});
test('port scope includes NetBIOS and does not omit paired service ports',()=>{
 assert.equal(ports.find(p=>p[0]==='NetBIOS')[1],'137–139');
 assert.equal(ports.find(p=>p[0]==='DHCP')[1],'67/68');
 assert.match(ports.find(p=>p[0]==='HTTPS')[4],/UDP 443/);
});
test('accuracy distinguishes no evidence from an incorrect answer',()=>{
 assert.equal(accuracy([]),null);assert.equal(accuracy([{correct:false}]),0);assert.equal(accuracy([{correct:true},{correct:true},{correct:false}]),67);
});
test('storage recovers from malformed JSON and unavailable access',()=>{
 assert.deepEqual(readState({getItem:()=>'{broken'}).completed,[]);
 assert.deepEqual(readState({getItem:()=>{throw Error('Denied');}}).answers,[]);
 const restored=readState({getItem:()=>JSON.stringify({completed:['dns'],theme:'dark',notes:{dns:'My note'},answers:'invalid'})});
 assert.deepEqual(restored.completed,['dns']);assert.equal(restored.theme,'dark');assert.equal(restored.notes.dns,'My note');assert.deepEqual(restored.answers,[]);
});
test('streak uses local calendar days and permits an unfinished current day',()=>{
 const now=new Date(2026,8,10,12);
 assert.equal(localDate(now),'2026-09-10');
 assert.equal(streak(['2026-09-08','2026-09-09'],now),2);
 assert.equal(streak(['2026-09-08','2026-09-09','2026-09-10'],now),3);
 assert.equal(streak(['2026-09-08'],now),0);
});

 test('guided lessons include substantive teaching, labs and distinct checks',()=>{
 const guided=lessons.filter(l=>l.steps);assert.equal(guided.length,47);
 for(const l of guided){assert.equal(l.goals.length,3);assert.ok(l.steps.length>=4);assert.ok(l.terms.length>=3);assert.ok(l.lab.task.length>60);assert.ok(l.lab.answer.length>100);assert.equal(new Set(checksFor(l).map(q=>q.question)).size,3);}
 });

test('expanded workshops retain identity and link to valid distinct lessons',()=>{
 for(const id of ['dhcp','dns','ipv4','router-switch','motherboard','cpu','ram']){const l=lessons.find(item=>item.id===id);assert.ok(l.steps.length>=5);assert.equal(l.summary.length,3);assert.ok(l.minutes>=24);for(const related of l.related){assert.notEqual(id,related);assert.ok(lessons.some(item=>item.id===related));}}
});

test('search finds expanded vocabulary and lab content',()=>{
 assert.ok(matchesLesson(lessons.find(l=>l.id==='dhcp'),'relay'));
 assert.ok(matchesLesson(lessons.find(l=>l.id==='dns'),'DMARC'));
 assert.equal(matchesLesson(lessons[0],'nonexistentwordxyz'),false);
});
test('practice includes all checks and reviews the exact missed question',()=>{
 assert.equal(practicePool(lessons,checksFor,[],'0').length,141);
 const history=[{id:'dns',context:'lesson',check:0,correct:false},{id:'dns',context:'lesson',check:1,correct:true}];
 assert.deepEqual(missedChecks(history,'dns'),[0]);
 const pool=practicePool(lessons,checksFor,history,'wrong');assert.equal(pool.length,1);assert.equal(pool[0].checkSlot,0);
 history.push({id:'dns',context:'practice',check:0,correct:true});assert.deepEqual(missedChecks(history,'dns'),[]);
 assert.deepEqual(missedChecks([{id:'dns',context:'practice',check:null,correct:false}],'dns'),[0]);
});
test('storage rejects corrupt nested values and deduplicates progress',()=>{
 const good={id:'dns',context:'lesson',check:1,correct:true,time:1,domain:2};
 const s=readState({getItem:()=>JSON.stringify({completed:['dns','dns',null],answers:[null,{},good,{...good,correct:'false'}],notes:{dns:42,dhcp:'keep'},sections:{dns:1.5,dhcp:3},cards:{dns:'bad',dhcp:'known'}})});
 assert.deepEqual(s.completed,['dns']);assert.deepEqual(s.answers,[good]);assert.deepEqual(s.notes,{dhcp:'keep'});assert.deepEqual(s.sections,{dhcp:3});assert.deepEqual(s.cards,{dhcp:'known'});
});

test('port recall accepts equivalent complete lists and ranges, but rejects missing and extra ports',()=>{
 for(const input of ['137–139','137-139','137,138,139','139 / 137 / 138','137 138 139'])assert.ok(matchesPorts(input,'137–139'),input);
 for(const input of ['67/68','68, 67','67-68'])assert.ok(matchesPorts(input,'67/68'),input);
 for(const input of ['137/139','137,138','137-140','','443abc','139-137','0','1-65535'])assert.equal(matchesPorts(input,'137–139'),false,input);
 assert.ok(matchesPorts('443','443'));assert.equal(matchesPorts('443,80','443'),false);
});

test('completion totals ignore obsolete IDs and duplicates without deleting saved history',()=>{
 const completed=['dns','removed-lesson','dns','ipv6'];
 assert.equal(completedCount(completed,lessons),2);
 assert.deepEqual(completed,['dns','removed-lesson','dns','ipv6']);
});

test('every related lesson exists and all new checks participate in search and domain practice',()=>{
 for(const l of lessons)for(const id of l.related||[]){assert.notEqual(id,l.id);assert.ok(lessons.some(other=>other.id===id),`${l.id}: missing ${id}`);}
 for(const id of ['ipv6','display-types','mobile-diagnosis','wifi-diagnosis']){
  const l=lessons.find(item=>item.id===id);assert.ok(l);
  const pool=practicePool(lessons,checksFor,[],String(l.domain)).filter(q=>q.id===id);
  assert.equal(pool.length,3);assert.deepEqual(pool.map(q=>q.checkSlot),[0,1,2]);
  assert.ok(matchesLesson(l,l.terms[0][0]));assert.ok(matchesLesson(l,l.lab.task));
 }
});



 test('search includes objective mappings, diagram text, and scenario explanations',()=>{
  const lesson={title:'Sample',objective:'9.8',flow:['unique-diagram-clue'],question:'unique-question-clue',explanation:'unique-explanation-clue',checks:[['unique-extra-check']]};
  for(const query of ['9.8','unique-diagram-clue','unique-question-clue','unique-explanation-clue','unique-extra-check'])assert.ok(matchesLesson(lesson,query),query);
 });
 test('resume selects the first unanswered check without confusing practice with lesson participation',()=>{
  const answers=[{id:'dns',context:'lesson',check:0},{id:'dns',context:'practice',check:1},{id:'dns',context:'lesson-previous',check:2}];
  assert.equal(nextCheckIndex(answers,'dns'),1);
  answers.push({id:'dns',context:'lesson',check:2});assert.equal(nextCheckIndex(answers,'dns'),1);
  answers.push({id:'dns',context:'lesson',check:1});assert.equal(nextCheckIndex(answers,'dns'),0);
  assert.equal(nextCheckIndex(answers,'dhcp'),0);
  assert.equal(nextCheckIndex([{id:'dns',context:'lesson',check:null}],'dns'),1);
 });
 test('new lessons are appended and every lesson has a complete worked workshop',()=>{
  assert.equal(lessons.find(l=>l.id==='usb-docks').number,41);
  assert.equal(lessons.find(l=>l.id==='containers-vdi').number,42);
  assert.equal(lessons.find(l=>l.id==='mobile-management').number,43);
  for(const l of lessons){
   assert.ok(l.steps.length>=4,l.id);
   for(const [title,body] of l.steps){assert.ok(title.length>5,l.id);assert.ok(body.length>100,l.id);}
   assert.equal(l.goals.length,3);assert.ok(l.confusion.length>40,l.id);
   assert.ok(l.lab.task.length>60,l.id);assert.ok(l.lab.answer.length>100,l.id);
  }
 });

test('shuffling keeps every card exactly once and preserves the source order',()=>{
 const source=['a','b','c','d'];const result=shuffled(source,()=>0);
 assert.deepEqual(source,['a','b','c','d']);assert.deepEqual(result,['b','c','d','a']);
 assert.deepEqual([...result].sort(),source);assert.deepEqual(shuffled([]),[]);
 assert.deepEqual(shuffled(['only']),['only']);
});
test('practice lengths cap at available unique questions and accept only supported sizes',()=>{
 const pool=practicePool(lessons,checksFor,[],'0');
 for(const count of [5,10,20]){const session=practiceSession(pool,String(count),()=>0.5);assert.equal(session.length,count);assert.equal(new Set(session.map(q=>q.id+':'+q.checkSlot)).size,count);}
 assert.equal(practiceSession(pool,99).length,5);
 assert.equal(practiceSession(pool.slice(0,2),20).length,2);
 assert.equal(practiceSession([],20).length,0);
});
test('infrastructure lessons append without moving existing lessons and join every practice flow',()=>{
 const ids=['poe','wireless-standards','firmware-boot','cloud-metering'];
 ids.forEach((id,i)=>{const l=lessons.find(l=>l.id===id);assert.equal(l.number,44+i);assert.equal(practicePool(lessons,checksFor,[],String(l.domain)).filter(q=>q.id===id).length,3);assert.ok(matchesLesson(l,l.terms[0][0]));});
});
