import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {lessons,questionFor} from '../src/core2-data.js';
import {checksFor} from '../src/checks.js';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser=await chromium.launch({headless:true,channel:'msedge'});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173/';
const go=async hash=>{await page.goto(`${base}?core=2#${hash}`);await page.locator('main h1').waitFor();};
try{
 await go('dashboard');
 await page.evaluate(()=>localStorage.setItem('core-one-mentor-v1',JSON.stringify({completed:['dns'],notes:{dns:'keep this'}})));
 for(const hash of ['course','tools','flashcards','practice','progress','saved','resources','ports']){await go(hash);assert.ok((await page.locator('main').innerText()).length>100);}
 assert.equal(await page.locator('.course-badge').innerText(),'CompTIA A+ Core 2\n220-1202 · Version 15');
 for(const l of lessons){
  await go(`lesson/${l.id}`);
  assert.equal(await page.locator('main h1').innerText(),l.title);
  for(let i=0;i<5;i++){await page.locator(`.section-tab[data-index="${i}"]`).click();assert.ok((await page.locator('#swipe-surface').innerText()).length>100);}
  await page.locator('.section-tab[data-index="2"]').click();
  await page.getByText('Reveal the worked solution',{exact:true}).click();
  assert.ok((await page.locator('#swipe-surface').innerText()).includes(l.lab.answer));
  await page.locator('.section-tab[data-index="4"]').click();
  for(let i=0;i<3;i++){
   await page.locator(`[data-action="select-check"][data-index="${i}"]`).click();
   const correct=questionFor(checksFor(l)[i]).choices.findIndex(a=>a.correct);
   await page.locator(`[data-action="lesson-answer"][data-choice="${correct}"]`).click();
  }
  await page.locator('[data-action="complete"]').click();
 }
 await go('progress');assert.ok((await page.locator('main').innerText()).includes('100%'));
 await go('lesson/c2-os-foundations');await page.locator('#lesson-notes').fill('Core 2 note');
 await page.reload();assert.equal(await page.locator('#lesson-notes').inputValue(),'Core 2 note');
 await go('practice');await page.locator('#quiz-length').selectOption('20');await page.locator('[data-action="quiz-start"]').click();
 await page.locator('[data-action="quiz-answer"]').first().waitFor();
 assert.match(await page.locator('main').innerText(),new RegExp(`of ${Math.min(20,lessons.length*3)}`,'i'));
 await go('course');
 await page.locator('#search').fill('differential');
 await page.locator('#search-results a[href="#lesson/c2-backups"]').click();
 assert.equal(await page.locator('main h1').innerText(),lessons.find(l=>l.id==='c2-backups').title);
 await page.locator('[data-action="bookmark"]').click();
 await go('saved');assert.ok((await page.locator('main').innerText()).includes('Backups: calculate'));
 await go('flashcards');await page.locator('#card-domain').selectOption('4');
 assert.match(await page.locator('main').innerText(),new RegExp(`of ${lessons.filter(l=>l.domain===4).length}`,'i'));
 await page.locator('[data-action="flip"]').click();
 assert.ok((await page.locator('.flashcard').innerText()).length>100);
 await page.locator('.course-switch a').first().click();await page.locator('main h1').waitFor();
 assert.ok((await page.locator('.course-badge').innerText()).includes('Core 1'));
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('core-one-mentor-v1')).completed),['dns']);
 await go('lesson/c2-encryption');await page.locator('.section-tab[data-index="2"]').click();
 await page.getByText('Reveal the worked solution',{exact:true}).click();
 await page.screenshot({path:'audit/core2-october4-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 for(const l of lessons){await go(`lesson/${l.id}`);for(let i=0;i<5;i++){await page.locator(`.section-tab[data-index="${i}"]`).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}}
 await page.locator('[data-action="menu"]').click();await page.locator('.course-switch a').first().click();
 assert.ok((await page.locator('.course-badge').innerText()).includes('Core 1'));
 await go('lesson/c2-macos');await page.locator('.section-tab[data-index="3"]').click();
 await page.screenshot({path:'audit/core2-october4-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log(`PASS: Core 2 routes, ${lessons.length*5} sections, ${lessons.length*3} checks, labs, completion, notes, practice, search, bookmarks, flashcards, course switching, storage isolation, and mobile overflow; zero browser errors.`);
}finally{await browser.close();}
