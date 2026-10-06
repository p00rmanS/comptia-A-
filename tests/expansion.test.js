import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {courseFor} from '../src/course.js';
import {checksFor} from '../src/checks.js';
import {matchesLesson,practicePool} from '../src/learning.js';

test('October expansion preserves all earlier questions and rotated answers in both courses',()=>{
 for(const [number,count,digest] of [[1,65,'d27afc0be01f499810c5f2066fecbd451fb7d681182c8e9306c063ee075f27d4'],[2,28,'2afc096c2b3ba05e62d21d6643b498b132ca45c4c923df6470b7fb598d680895']]){
  const c=courseFor('?core='+number);
  const snapshot=c.lessons.slice(0,count).map(l=>({id:l.id,number:l.number,checks:checksFor(l).map(q=>({question:q.question,choices:c.questionFor(q).choices}))}));
  assert.equal(createHash('sha256').update(JSON.stringify(snapshot)).digest('hex'),digest);
  const added=c.lessons.slice(count);assert.equal(added.length,2);
  for(const l of added){
   assert.ok(matchesLesson(l,l.terms[0][0]));assert.equal(l.steps.length,4);
   assert.equal(practicePool(c.lessons,checksFor,[],String(l.domain)).filter(q=>q.id===l.id).length,3);
  }
 }
});

test('transfer lab consistently distinguishes ideal ceiling from achieved throughput',()=>{
 const l=courseFor().lessons.find(l=>l.id==='transfer-speed-lab');
 assert.equal(100/8,12.5);assert.equal(500/(100/8),40);assert.equal(500/80,6.25);
 for(const phrase of ['12.5 MB/s','40 seconds','6.25 MB/s'])assert.ok(l.lab.answer.includes(phrase));
});
