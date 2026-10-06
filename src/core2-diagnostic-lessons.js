export const core2DiagnosticLessons=[
 {
 id:'c2-log-diagnosis',title:'Log diagnosis: build a timeline before choosing a cause',domain:3,objective:'1.4 / 3.1',minutes:27,
 big:'Logs record events, but diagnosis requires matching those events to the symptom, time, and affected system rather than treating every warning as the cause.',
 taglish:'Maraming warning sa logs kahit gumagana ang PC. I-match ang oras, source, at affected task. Ang error na nangyari pagkatapos ng failure puwedeng consequence lang, hindi root cause.',
 analogy:'A diary records what happened. A detective still needs to relate the entries to the incident rather than blaming the loudest sentence.',
 exam:'Use Event Viewer and troubleshooting evidence for Windows symptoms. Distinguish Application, System, and Security logs, filtering versus deletion, and correlation versus proof.',
 tech:'An application closes at 14:05. Record the exact symptom, inspect relevant events around that time, and compare recurring failures before assuming an unrelated morning warning caused it.',
 flow:['Record symptom and time','Filter relevant evidence','Compare a hypothesis','Verify and preserve'],
 goals:['Select relevant event evidence','Build a trustworthy timeline','Test a hypothesis without deleting history'],
 terms:[['Event source','The component or provider recording an event.'],['Event ID','A provider-associated event identifier; interpret it with the source and details.'],['Correlation','Events occurring in a related pattern; this alone does not establish causation.']],
 steps:[
 ['Anchor the user report','Ask what task failed, the visible message, approximate time, and whether the problem repeats. Note the device and any time-zone or clock discrepancy so records from different systems can be compared without inventing a false sequence.'],
 ['Choose a relevant record','Application events may explain app failures; System events can record OS, service, or driver issues. Security events depend on audit configuration and permissions. An empty search does not prove nothing happened: confirm the chosen log, filter, and retention.'],
 ['Read details and relationships','Read source, event ID, timestamp, message, and surrounding events. A service failure may follow a network loss rather than cause it. Compare another occurrence and a working period; use the evidence to choose a limited, testable hypothesis.'],
 ['Preserve and verify','Filter or export appropriate evidence according to policy instead of clearing the log to hide warnings. Test an approved change, repeat the original task, and record new observations. Keep unnecessary personal information out of a general ticket.']
 ],
 lab:{task:'Paper lab: an app fails at 14:05. A storage warning appears at 09:00, an app crash event at 14:05, and a service retry at 14:06. Which event is the best starting point, and what is still unknown?',answer:'Start with the app crash event matching the affected task and time, reading its source, details, and surrounding records. The earlier storage warning may matter only if further evidence connects it to the failure; the later retry could be a consequence. The root cause remains unknown. Compare recurrence, gather the exact user symptom, and test a supported hypothesis without deleting log history.'},
 confusion:'An event ID without its provider and details can be misleading. The nearest warning is not automatically the root cause.',
 summary:['Match evidence to symptom and time.','Read context before deciding causation.','Preserve relevant records and verify the repair.'],related:['c2-windows-tools','c2-app-troubleshooting'],
 checks:[
 ['An app fails at 14:05. Which evidence is the best starting point?','The matching app crash event and its details','Any unrelated warning from yesterday','The oldest event regardless of source','Matching task, source, and time gives relevant evidence. Unrelated or merely old events are not automatically causal.'],
 ['How can a technician narrow an Event Viewer investigation while preserving history?','Filter relevant events or export an approved subset','Clear every log before investigating','Disable all auditing permanently','Filtering changes the view without deleting recorded evidence. Clearing logs destroys history; disabling auditing is not a routine diagnostic filter.'],
 ['A service retry occurs after an application crash. What can be concluded from order alone?','The retry may be a consequence; causation needs evidence','The retry definitely caused the earlier crash','The clock can never be wrong','Temporal order helps build a hypothesis but cannot alone establish the cause. Clock differences and event context also matter.']
 ],tip:'A timeline guides a hypothesis; a controlled test checks it.'
 },
 {
 id:'c2-update-planning',title:'Update planning: protect the device and verify the work',domain:2,objective:'1.6 / 2.7',minutes:26,
 big:'Updates repair software weaknesses and defects, but successful support also checks compatibility, deployment status, restart requirements, and the user’s original workflow.',
 taglish:'Update from approved sources, then verify. Hindi sapat ang downloaded lang: puwedeng pending install or restart. Sa managed PC, sundin ang deployment policy at huwag basta i-disable ang security updates.',
 analogy:'A building repair needs the right materials, an approved work schedule, and an inspection afterward. Ordering the materials is not the completed repair.',
 exam:'Recognize patching as a workstation protection measure and use Windows update settings appropriately. Apply organizational change and recovery procedures; a patch does not replace backup or endpoint protection.',
 tech:'A fleet update reports downloaded on one laptop but pending restart. Check the actual installed state and approved restart timing before recording remediation as complete.',
 flow:['Check policy and source','Prepare compatibility and recovery','Deploy and restart','Verify protection and workflow'],
 goals:['Distinguish download from completed installation','Plan an approved update with recovery','Verify version and task success'],
 terms:[['Patch','A software change addressing defects or security issues.'],['Deployment ring','A staged group receiving an update before broader rollout.'],['Pending restart','A state where restarting is required to finish applying a change.']],
 steps:[
 ['Confirm the supported path','Identify OS, application, firmware or driver version, vendor support status, and the organization’s update policy. Use approved vendor or management sources. A pop-up offering an unknown updater is not proof of a legitimate security repair.'],
 ['Prepare for the change','Review applicability and known compatibility concerns for the actual device and workload. Confirm recoverable data, any approved recovery-key access, and a rollback or escalation plan. A test ring reduces uncertainty but cannot guarantee every device will behave identically.'],
 ['Check installation status','Track download, installation, failure codes, and restart requirements separately. Arrange an approved restart after saving work. A downloaded package or a green-looking summary does not by itself prove the required version is active on the endpoint.'],
 ['Verify the result','Confirm the expected installed version or update status, check for recurring failures, and test the user’s important task. If a regression occurs, capture evidence and follow approved recovery and escalation instead of leaving updates disabled indefinitely.']
 ],
 lab:{task:'Paper lab: three devices report update states: A downloaded, B installed with restart pending, and C restarted with the expected version and a successful payroll task test. Which is verified complete, and what remains for A and B?',answer:'C has evidence of completed installation and a working representative workflow. A still needs confirmed installation and any required restart, followed by verification. B needs its approved restart and a check of the active installed state and workload. Record the individual states rather than declaring the whole group protected because the package was downloaded.'},
 confusion:'A successful backup is not a security patch, and a downloaded update is not necessarily an active installed fix.',
 summary:['Use an approved source and deployment policy.','Track installation and restart separately.','Verify the active version and original task.'],related:['c2-change-management','c2-backups','c2-windows-settings'],
 checks:[
 ['An update is downloaded but not installed. What should the ticket say?','Installation and verification remain outstanding','The endpoint is definitely fully patched','Backups are no longer necessary','Download is a distinct stage. It does not establish active remediation, and update status does not replace recoverable data.'],
 ['What supports a broad update rollout?','An approved staged test and a recovery plan','An unknown updater pop-up','Disabling all security tools permanently','A staged test and recovery plan manage compatibility uncertainty. Unknown installers lack trust, and permanent protection removal increases exposure.'],
 ['An update regression disrupts payroll. What is the appropriate response?','Capture evidence and follow approved recovery and escalation','Hide the error and close the ticket','Disable updates forever without approval','Documenting the regression supports a controlled recovery decision. Hiding failures and indefinite unapproved disabling do not resolve the support obligation.']
 ],tip:'Downloaded, installed, restarted, and verified are different milestones.'
 }
];
