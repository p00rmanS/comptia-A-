import test from 'node:test';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {courseFor} from '../src/course.js';
import {checksFor} from '../src/checks.js';
import {readState} from '../src/storage.js';
import {practicePool,matchesLesson} from '../src/learning.js';

test('Core 2 has complete workshops and a distinct practice bank',()=>{
 const c=courseFor('?core=2');
 assert.equal(c.domains.length,4);
 assert.equal(c.domains.reduce((n,d)=>n+d.weight,0),100);
 assert.equal(c.lessons.length,30);
 assert.equal(new Set(c.lessons.map(l=>l.id)).size,c.lessons.length);
 for(const d of c.domains)assert.ok(c.lessons.some(l=>l.domain===d.id));
 for(const l of c.lessons){
  for(const field of ['big','taglish','analogy','exam','tech','confusion','tip'])assert.ok(l[field].length>15);
  assert.equal(l.goals.length,3);assert.ok(l.steps.length>=4);assert.ok(l.terms.length>=3);
  assert.ok(l.lab.answer.length>100);assert.equal(l.summary.length,3);
  assert.equal(new Set(checksFor(l).map(q=>q.question)).size,3);
  for(const q of checksFor(l)){assert.equal(c.questionFor(q).choices.filter(a=>a.correct).length,1);assert.equal(new Set(q.options).size,3);}
 }
 const bank=practicePool(c.lessons,checksFor,[],'0');assert.equal(bank.length,90);
 assert.ok(bank.every(q=>q.id.startsWith('c2-')));
 assert.ok(matchesLesson(c.lessons[1],'authorization'));
});

test('Core 2 expansion retains original lesson and rotated question identities',()=>{
 const c=courseFor('?core=2');
 const original=c.lessons.slice(0,4).map(l=>({id:l.id,number:l.number,checks:checksFor(l).map(q=>({question:q.question,choices:c.questionFor(q).choices}))}));
 assert.equal(createHash('sha256').update(JSON.stringify(original)).digest('hex'),'c8d359424260c32a3d5e49a167bd555681ddb8bf90514f9d4ceaa36abd392440');
 const previous=c.lessons.slice(0,16).map(l=>({id:l.id,number:l.number,checks:checksFor(l).map(q=>({question:q.question,choices:c.questionFor(q).choices}))}));
 assert.equal(createHash('sha256').update(JSON.stringify(previous)).digest('hex'),'c7faae7d86fc1c737510c7e10cbee7ae881ae8ab30300916783092fb9d2f17fd');
 for(const [i,l] of c.lessons.entries()){
  assert.equal(l.number,i+1);
  for(const related of l.related||[]){assert.notEqual(related,l.id);assert.ok(c.lessons.some(x=>x.id===related),`${l.id}: ${related}`);}
 }
 const paths=c.studyPaths.flatMap(p=>p.ids);
 assert.equal(new Set(paths).size,c.lessons.length);
 assert.deepEqual([...paths].sort(),c.lessons.map(l=>l.id).sort());
});

test('new Core 2 material participates in search, domain practice, and missed-check review',()=>{
 const c=courseFor('?core=2');
 for(const [id,term] of [['c2-filesystems','6 GiB'],['c2-linux-basics','640'],['c2-recovery','Safe Mode'],['c2-backups','I1 + I2 + I3'],['c2-change-management','rollback'],['c2-windows-editions','Device Encryption'],['c2-macos','Time Machine'],['c2-wireless-security','RADIUS'],['c2-browser-diagnosis','certificate'],['c2-evidence-privacy','custody'],['c2-scripting','approvedList']]){
  assert.ok(matchesLesson(c.lessons.find(l=>l.id===id),term),`${id}: ${term}`);
 }
 for(const d of c.domains){
  const selected=practicePool(c.lessons,checksFor,[],String(d.id));
  assert.equal(selected.length,c.lessons.filter(l=>l.domain===d.id).length*3);
  assert.ok(selected.every(q=>q.domain===d.id));
 }
 const history=[{id:'c2-backups',context:'lesson',check:1,correct:false}];
 const missed=practicePool(c.lessons,checksFor,history,'wrong');
 assert.equal(missed.length,1);assert.equal(missed[0].id,'c2-backups');assert.equal(missed[0].checkSlot,1);
 history.push({id:'c2-backups',context:'practice',check:1,correct:true});
 assert.equal(practicePool(c.lessons,checksFor,history,'wrong').length,0);
});

test('course selection keeps Core 1 defaults and isolates saved progress',()=>{
 const one=courseFor(),two=courseFor('?core=2');
 assert.equal(one.lessons.length,67);assert.equal(courseFor('?core=invalid').number,1);
 assert.notEqual(one.storageKey,two.storageKey);
 const saved=new Map([[one.storageKey,JSON.stringify({completed:['dns'],notes:{dns:'Core 1'}})],[two.storageKey,JSON.stringify({completed:['c2-os-foundations'],notes:{'c2-os-foundations':'Core 2'}})]]);
 const storage={getItem:key=>saved.get(key)};
 assert.deepEqual(readState(storage).completed,['dns']);
 assert.deepEqual(readState(storage,two.storageKey).completed,['c2-os-foundations']);
 assert.equal(readState(storage,two.storageKey).notes.dns,undefined);
});
