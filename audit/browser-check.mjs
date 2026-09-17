// Run against a local preview, using an installed Playwright runtime.
// Example: set PLAYWRIGHT_MODULE to the absolute playwright/index.mjs path.
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {lessons,questionFor} from '../src/data.js';
import {checksFor} from '../src/checks.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE||undefined});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173/';
async function route(hash){await page.goto(`${base}#${hash}`);await page.locator('main h1').waitFor();}
async function section(n){await page.locator(`.section-tab[data-index="${n}"]`).click();}
try {
 await route('dashboard');
 assert.match(await page.locator('main').innerText(),/38/);
 for(const hash of ['course','tools','flashcards','ports','practice','progress','saved','resources','unknown','lesson/unknown']){
  await route(hash);assert.ok((await page.locator('main').innerText()).length>100);
 }
 for(const lesson of lessons){
  await route(`lesson/${lesson.id}`);
  assert.equal(await page.locator('main h1').innerText(),lesson.title);
  for(let n=0;n<5;n++){await section(n);assert.ok((await page.locator('#swipe-surface').innerText()).length>100);}
 }
 for(const id of ['ipv6','display-types','mobile-diagnosis','wifi-diagnosis']){
  const lesson=lessons.find(l=>l.id===id);
  await route(`lesson/${id}`);await section(2);
  await page.getByText('Reveal the worked solution',{exact:true}).click();
  assert.ok(await page.getByText(lesson.lab.answer,{exact:true}).isVisible());
  await section(4);
  for(let n=0;n<3;n++){
   const q=questionFor(checksFor(lesson)[n]);const answer=q.choices.findIndex(c=>c.correct);
   await page.locator(`[data-action="lesson-answer"][data-choice="${answer}"]`).click();
   assert.match(await page.locator('.feedback[role="status"]').innerText(),/That’s right/);
   await page.locator(`[data-action="${n<2?'next-check':'complete'}"]`).click();
  }
 }
 await page.reload();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('core-one-mentor-v1')));
 assert.equal(saved.completed.length,4);assert.equal(saved.answers.length,12);
 await page.locator('#lesson-notes').fill('<script>test</script> My field note');
 await page.reload();assert.equal(await page.locator('#lesson-notes').inputValue(),'<script>test</script> My field note');
 await page.locator('[data-action="bookmark"]').click();
 await route('saved');assert.ok(await page.getByText('<script>test</script> My field note',{exact:true}).isVisible());
 await route('ports');await page.locator('#port-answer').fill('21, 20');
 await page.locator('[data-action="port-submit"]').click();assert.match(await page.locator('.feedback').innerText(),/^Correct/);
 await route('course');await page.locator('#search').fill('digitizer');
 assert.ok(await page.locator('#search-results a[href="#lesson/display-types"]').isVisible());
 await route('flashcards');await page.locator('[data-action="flip"]').click();
 await page.locator('[data-action="card-known"]').click();
 assert.match(await page.locator('main').innerText(),/Card 2 of 38/i);
 await route('practice');await page.locator('#quiz-domain').selectOption('5');
 await page.locator('[data-action="quiz-start"]').click();
 for(let i=0;i<5;i++){await page.locator('[data-action="quiz-answer"]').first().click();await page.locator('[data-action="quiz-next"]').click();}
 assert.match(await page.locator('main').innerText(),/Session complete/i);
 // Force storage failure in this isolated test context; no personal browser data is touched.
 await route('lesson/ipv6');
 await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('Test quota failure','QuotaExceededError');};});
 await page.locator('#lesson-notes').fill('Temporary note');
 assert.match(await page.locator('#note-status').innerText(),/Not saved/);
 await page.reload();assert.notEqual(await page.locator('#lesson-notes').inputValue(),'Temporary note');
 await section(1);await page.screenshot({path:'audit/2026-09-12-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await route('course');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('[data-action="menu"]').click();assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'false');
 await route('lesson/display-types');await section(3);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('[data-action="theme"]').click();assert.ok(await page.locator('html.dark').count());
 await page.screenshot({path:'audit/2026-09-12-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,lessons:lessons.length,lessonSections:lessons.length*5,newLessonChecks:12,consoleErrors:errors,viewports:['1440x1000','390x844']}));
}finally{await browser.close();}

