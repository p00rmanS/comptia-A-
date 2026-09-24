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
page.on('console',m=>{if(m.type()==='error')errors.push(`${m.text()} (${m.location().url})`);});
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4173/';
async function route(hash){await page.goto(`${base}#${hash}`);await page.locator('main h1').waitFor();}
async function section(n){await page.locator(`.section-tab[data-index="${n}"]`).click();}
try {
 await route('dashboard');
 assert.ok((await page.locator('main').innerText()).includes(String(lessons.length)));
 for(const hash of ['course','tools','flashcards','ports','practice','progress','saved','resources','unknown','lesson/unknown']){
  await route(hash);assert.ok((await page.locator('main').innerText()).length>100);
 }
 for(const lesson of lessons){
  await route(`lesson/${lesson.id}`);
  assert.equal(await page.locator('main h1').innerText(),lesson.title);
  for(let n=0;n<5;n++){await section(n);assert.ok((await page.locator('#swipe-surface').innerText()).length>100);}
 }
 for(const id of lessons.map(l=>l.id)){
  const lesson=lessons.find(l=>l.id===id);
  await route(`lesson/${id}`);await section(2);
  await page.getByText('Reveal the worked solution',{exact:true}).click();
  assert.ok(await page.getByText(lesson.lab.answer,{exact:true}).isVisible());
  if(lesson.number%10===0)console.log(`Verified labs and checks through lesson ${lesson.number} of ${lessons.length}`);
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
 assert.equal(saved.completed.length,lessons.length);assert.equal(saved.answers.length,lessons.length*3);
 await page.locator('#lesson-notes').fill('<script>test</script> My field note');
 await page.reload();assert.equal(await page.locator('#lesson-notes').inputValue(),'<script>test</script> My field note');
 await page.locator('[data-action="bookmark"]').click();
 await route('saved');assert.ok(await page.getByText('<script>test</script> My field note',{exact:true}).isVisible());
 await route('ports');await page.locator('#port-answer').fill('21, 20');
 await page.locator('[data-action="port-submit"]').click();assert.match(await page.locator('.feedback').innerText(),/^Correct/);
 await route('course');await page.locator('#search').fill('digitizer');
 assert.ok(await page.locator('#search-results a[href="#lesson/display-types"]').isVisible());
 await page.locator('#search').fill('3389');
 await page.locator('#search-results a[href="#ports/RDP"]').click();
 await page.getByRole('heading',{name:'Which port does RDP use?'}).waitFor();
 await route('lesson/dns');await section(4);
 await page.locator('[data-action="retry-lesson"]').click();
 await page.locator('[data-action="lesson-answer"]').first().click();
 await page.reload();assert.match(await page.locator('#swipe-surface').innerText(),/Check 2 of 3/i);
 await page.locator('[data-action="select-check"][data-index="2"]').click();
 await page.locator('[data-action="lesson-answer"]').first().click();
 assert.ok(await page.locator('[data-action="complete"]').isDisabled());
 await page.locator('[data-action="select-check"][data-index="1"]').click();
 await page.locator('[data-action="lesson-answer"]').first().click();
 await page.locator('[data-action="select-check"][data-index="2"]').click();
 assert.ok(await page.locator('[data-action="complete"]').isEnabled());
 await route('flashcards');await page.locator('[data-action="flip"]').click();
 await page.locator('[data-action="card-known"]').click();
 assert.ok((await page.locator('main').innerText()).toLowerCase().includes(`card 2 of ${lessons.length}`));
 await page.locator('[data-action="shuffle"]').click();
 const seenCards=[];
 for(let i=0;i<lessons.length;i++){seenCards.push(await page.locator('.flashcard h2').innerText());await page.locator('[data-action="card-next"]').click();}
 assert.equal(new Set(seenCards).size,lessons.length);
 assert.equal(await page.locator('.flashcard h2').innerText(),seenCards[0]);
 await page.locator('#card-domain').selectOption('4');
 const domainCards=lessons.filter(l=>l.domain===4);
 const filteredCards=[];
 for(let i=0;i<domainCards.length;i++){filteredCards.push(await page.locator('.flashcard h2').innerText());await page.locator('[data-action="card-next"]').click();}
 assert.deepEqual([...filteredCards].sort(),domainCards.map(l=>l.title).sort());
 await route('practice');await page.locator('#quiz-domain').selectOption('5');
 await page.locator('[data-action="quiz-start"]').click();
 for(let i=0;i<5;i++){await page.locator('[data-action="quiz-answer"]').first().click();await page.locator('[data-action="quiz-next"]').click();}
 assert.match(await page.locator('main').innerText(),/Session complete/i);
 for(const count of [10,20]){
  await page.locator('[data-action="quiz-reset"]').click();
  await page.locator('#quiz-length').selectOption(String(count));
  await page.locator('[data-action="quiz-start"]').click();
  const questions=[];
  for(let i=0;i<count;i++){
   questions.push(await page.locator('.learning-panel h2').innerText());
   await page.locator('[data-action="quiz-answer"]').first().click();
   await page.locator('[data-action="quiz-next"]').click();
  }
  assert.equal(new Set(questions).size,count);
  assert.match(await page.locator('main').innerText(),/Session complete/i);
 }
 // Force storage failure in this isolated test context; no personal browser data is touched.
 await route('lesson/ipv6');
 await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('Test quota failure','QuotaExceededError');};});
 await page.locator('#lesson-notes').fill('Temporary note');
 assert.match(await page.locator('#note-status').innerText(),/Not saved/);
 await section(2);assert.match(await page.locator('#note-status').innerText(),/Not saved/);
 await page.locator('[data-action="clear-note"]').click();assert.match(await page.locator('#toast').innerText(),/only for this session/);
 await page.reload();assert.notEqual(await page.locator('#lesson-notes').inputValue(),'Temporary note');
 await route('lesson/subnet-lab');await section(2);await page.getByText('Reveal the worked solution',{exact:true}).click();await page.screenshot({path:'audit/2026-09-24-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await route('course');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('[data-action="menu"]').click();assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-btn').getAttribute('aria-expanded'),'false');
 for(const hash of ['dashboard','tools','flashcards','ports','practice','progress','saved','resources']){await route(hash);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),hash);}
 for(const id of lessons.slice(47).map(l=>l.id)){await route(`lesson/${id}`);for(let n=0;n<5;n++){await section(n);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} section ${n}`);}}
 await route('lesson/raid-capacity');await section(2);await page.getByText('Reveal the worked solution',{exact:true}).click();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('[data-action="theme"]').click();assert.ok(await page.locator('html.dark').count());
 await page.screenshot({path:'audit/2026-09-24-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({passed:true,lessons:lessons.length,lessonSections:lessons.length*5,lessonChecks:lessons.length*3,consoleErrors:errors,viewports:['1440x1000','390x844']}));
}finally{await browser.close();}

