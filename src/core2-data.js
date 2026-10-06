import {core2DiagnosticLessons} from './core2-diagnostic-lessons.js';
import {core2OSLessons} from './core2-os-lessons.js';
import {core2SecurityLessons} from './core2-security-lessons.js';
import {core2RecoveryLessons} from './core2-recovery-lessons.js';
import {core2PlatformLessons} from './core2-platform-lessons.js';
import {core2AccessLessons} from './core2-access-lessons.js';
import {core2OperationsLessons} from './core2-operations-lessons.js';
export {questionFor} from './data.js';
export const ports=[];
export const sources={objectives:'https://www.comptia.org/en-us/certifications/a/',references:[
 ['CompTIA-authored Core 2 objectives (version 2.0, hosted by ONLC)','https://www.onlc.com/comptia/comptia-a-220-1202-exam-objectives.pdf'],
 ['Microsoft: filesystem features','https://learn.microsoft.com/en-us/windows/win32/fileio/filesystem-functionality-comparison'],
 ['Microsoft: Windows command reference','https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands'],
 ['Microsoft: Windows recovery options','https://support.microsoft.com/en-us/windows/experience/backup-recovery/recovery-options-in-windows'],
 ['GNU: file and permission commands','https://www.gnu.org/software/coreutils/manual/coreutils.html'],
 ['Google: troubleshooting Android apps','https://support.google.com/googleplay/answer/2668665?hl=en'],
 ['Microsoft: Windows access control','https://learn.microsoft.com/en-us/windows/security/identity-protection/access-control/access-control'],
 ['CISA: ransomware response and prevention','https://www.cisa.gov/stopransomware/ransomware-guide'],
 ['Microsoft: Remote Desktop host requirements','https://learn.microsoft.com/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access'],
 ['Microsoft: Device Encryption','https://support.microsoft.com/en-us/windows/security/encryption/device-encryption-in-windows'],
 ['Apple: installing macOS apps','https://support.apple.com/en-gb/guide/mac-help/mh35835/mac'],
 ['Google: private browsing limits','https://support.google.com/chrome/answer/95464/browse-in-private-computer?hl=en-GB'],
 ['Google: browser error diagnosis','https://support.google.com/chrome/answer/95669?hl=en'],
 ['Microsoft: Quick Assist','https://support.microsoft.com/en-US/Windows/Apps/solve-pc-problems-remotely-using-quick-assist'],
 ['NIST: forensic techniques and incident response','https://csrc.nist.gov/pubs/sp/800/86/final'],
 ['Microsoft: PowerShell script basics','https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_scripts'],
 ['Microsoft: viewing security event logs','https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/view-the-security-event-log'],
 ['CISA: software update guidance','https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Software-Updates-Tip-Sheet.pdf']
]};
export const studyPaths=[
 {title:'Build your OS foundation',ids:['c2-os-foundations','c2-windows-editions','c2-installation','c2-filesystems','c2-windows-tools','c2-windows-commands','c2-windows-settings','c2-client-networking','c2-linux-basics','c2-macos','c2-cloud-productivity']},
 {title:'Protect access and respond to threats',ids:['c2-account-security','c2-permissions','c2-encryption','c2-wireless-security','c2-browser-security','c2-phishing','c2-malware','c2-update-planning']},
 {title:'Diagnose and recover',ids:['c2-app-troubleshooting','c2-recovery','c2-mobile-apps','c2-browser-diagnosis','c2-log-diagnosis']},
 {title:'Support with a recovery plan',ids:['c2-support-records','c2-backups','c2-change-management','c2-remote-support','c2-evidence-privacy','c2-scripting']}
];
export const domains=[
 {id:1,name:'Operating systems',weight:28,icon:'hard-drive',color:'blue',description:'Understand the software that runs the device'},
 {id:2,name:'Security',weight:28,icon:'file-check',color:'green',description:'Protect accounts, devices, and information'},
 {id:3,name:'Software troubleshooting',weight:23,icon:'wrench',color:'rose',description:'Isolate symptoms and verify the fix'},
 {id:4,name:'Operational procedures',weight:21,icon:'clipboard-check',color:'purple',description:'Support people with care and clear records'}
];
const workshops=[
 {
 id:'c2-os-foundations',title:'Operating systems: the software coordinator',domain:1,objective:'1.1',minutes:22,
 big:'An operating system manages hardware resources and provides services that applications use. Start by separating the device, its operating system, and the apps running on it.',
 taglish:'Ang OS ang coordinator ng computer. Ang browser ay app, hindi OS. Bago mag-install, alamin kung compatible ang app sa OS, version, at processor architecture ng device.',
 analogy:'A restaurant manager assigns kitchen space and staff to orders. Applications request work; the operating system coordinates access to the shared resources.',
 exam:'Recognize Windows, macOS, Linux, and Chrome OS as workstation operating systems, and Android, iOS, and iPadOS as mobile operating systems. Compatibility and vendor support matter when choosing a platform.',
 tech:'A customer wants a Windows-only accounting application on a Mac. Record the application requirements and ask the vendor about supported options before promising that the installer will run.',
 goals:['Distinguish an OS from an application','Explain the role of a driver','Check compatibility before installation'],
 flow:['Application request','OS services','Device driver','Hardware'],
 steps:[
 ['Find the layers','The processor, memory, and storage are hardware. Windows or another OS manages resources. A browser or accounting program is an application. Identifying the layer prevents replacing hardware for a software compatibility problem.'],
 ['Follow an application request','When you save a document, the application asks the OS to write data. The OS coordinates file access and storage operations. The application does not need to implement every storage controller itself.'],
 ['Understand drivers','A driver is software that helps the OS communicate with a device. A connected printer may still need a supported driver. Use the OS or manufacturer-approved source and match the platform; a physically connected device is not proof of software compatibility.'],
 ['Check the support boundary','Record the OS version, edition, architecture, application requirements, and vendor support status. Similar-looking desktops do not imply identical compatibility. An unsupported OS may still boot but no longer receive normal security fixes; follow the organization’s migration policy.']
 ],
 terms:[['Operating system','Software that manages resources and provides services for applications.'],['Driver','Software that enables OS communication with a device.'],['Architecture','The processor platform an OS or application is built to run on, such as x64 or ARM64.']],
 lab:{task:'Paper lab: inventory a laptop running Windows with a browser, an accounting app, and a USB printer. Label the hardware, OS, apps, and driver layer. What must you check before moving the accounting app to a different OS?',answer:'The laptop and printer are hardware; Windows is the OS; the browser and accounting program are apps; the printer driver connects OS print services with the device. Check the vendor’s supported OS versions and architectures, installation requirements, licensing, and data migration process before promising a move.'},
 confusion:'A browser can access a web application on several platforms, but a native application installer still needs a compatible OS and architecture.',
 summary:['Identify hardware, OS, and application separately.','Drivers connect the OS to devices.','Check compatibility and support before changing platforms.'],
 checks:[
 ['A Windows-only installer will not run natively on macOS. What should you check first?','Vendor-supported platforms and alternatives','Replace the Mac’s storage immediately','Install an unrelated printer driver','The stated OS requirement is the key clue. Supported alternatives address compatibility; replacing storage or changing a printer driver does not make a Windows program a native macOS app.'],
 ['Which component helps the OS communicate with a printer?','A device driver','A spreadsheet document','A user’s bookmark list','A driver participates in device communication. A document is data, and browser bookmarks do not implement printer support.'],
 ['An old OS still boots after normal vendor support ends. What follows?','Booting does not prove ongoing security support','It must still receive every security update','All installed applications immediately disappear','Support status is separate from whether the system starts. Continued updates cannot be assumed, and the end of support does not automatically delete applications.']
 ],tip:'Name the layer before choosing the fix.'
 },
 {
 id:'c2-account-security',title:'Accounts: identity is not permission',domain:2,objective:'2.1 / 2.2',minutes:24,
 big:'Authentication checks who you are. Authorization determines what you may access. Least privilege gives a person only the access needed for the task.',
 taglish:'Nakalog-in ka na, pero hindi ibig sabihin puwede mong buksan lahat. Authentication ang identity check; authorization ang permissions. Bigyan lang ng access na kailangan sa trabaho.',
 analogy:'An office badge proves your identity at reception. The doors your badge opens depend on your role; entering the building does not grant a key to every room.',
 exam:'Distinguish authentication, authorization, least privilege, and multifactor authentication (MFA). Two passwords are still one factor type: something you know.',
 tech:'An employee can sign in but cannot open a team folder. Verify their approved role and effective access. Do not solve a narrow permission issue by granting administrator rights.',
 goals:['Separate authentication from authorization','Apply least privilege','Recognize different authentication factor types'],
 flow:['Identify account','Authenticate identity','Check permissions','Allow or deny resource'],
 steps:[
 ['Verify identity','A password is something you know; a hardware security key is something you have; a fingerprint is something you are. MFA combines distinct factor types. Never ask the user to reveal a password to diagnose a sign-in issue.'],
 ['Locate the access decision','Successful sign-in proves only that authentication succeeded for that service. File permissions, group membership, and organizational policy still govern resource access. Confirm the account and exact resource before changing settings.'],
 ['Keep access narrow','Use a standard account for routine work. Approved administrative tasks may need elevation, but permanent broad privileges create unnecessary exposure. Grant the required role through the organization’s access process.'],
 ['Test the intended outcome','After an approved change, test that the user can perform the requested job and has not gained unrelated access. Document the change without recording secrets. An elevation prompt is a decision point, not a signal to approve anything that appears.']
 ],
 terms:[['Authentication','Checking the claimed identity.'],['Authorization','Deciding what an identity may do.'],['Least privilege','Limiting access to what the job requires.'],['MFA','Authentication using more than one factor type.']],
 lab:{task:'Paper lab: a payroll clerk signs in successfully but cannot access the payroll folder. A colleague suggests making the clerk a local administrator. Explain the next check and a narrower solution.',answer:'Confirm the clerk’s identity, the exact folder, and the approved payroll role. Review group membership and effective permissions with the resource owner. If approved, grant the needed resource access through the proper group, then retest. Local administrator access is broader than required and may not grant access to a remote resource anyway.'},
 confusion:'A password plus a PIN are both knowledge factors. Two prompts alone do not establish multifactor authentication.',
 summary:['Identity and permission are separate checks.','Use distinct factor types for MFA.','Grant only approved task-specific access.'],
 checks:[
 ['A user signs in but a shared folder returns access denied. What should you investigate?','Approved group membership and folder permissions','Replace the monitor','Give every employee administrator rights','Successful sign-in points toward authorization for this resource. Monitor replacement is unrelated; broad administrator access violates least privilege and may not fix remote permissions.'],
 ['Which pair uses distinct authentication factor types?','Password and hardware security key','Password and PIN','Password and security-question answer','A password is knowledge and a hardware key is possession. PINs and security-question answers are also knowledge, so those pairs do not span factor types.'],
 ['Which account approach fits routine document editing?','A standard account with needed document access','A shared administrator account for all staff','A permanently elevated session for every app','A standard account supports ordinary work with less exposure. Shared administrator identities weaken accountability; routine elevation grants unnecessary power.']
 ],tip:'Signed in but denied a resource? Check authorization.'
 },
 {
 id:'c2-app-troubleshooting',title:'A frozen app: collect clues before changing things',domain:3,objective:'3.1',minutes:25,
 big:'A single unresponsive app is different from an unresponsive operating system. Compare scope, resource use, and recent changes before choosing a repair.',
 taglish:'Isang app lang ba ang stuck o buong PC? Alamin muna ang scope. Bago End task, sabihin sa user na puwedeng mawala ang unsaved work; huwag basta patayin lahat ng processes.',
 analogy:'One stalled checkout lane does not prove that the entire store has no electricity. Compare the other lanes before shutting down the building.',
 exam:'Task Manager shows running processes and resource use. Event Viewer provides logs that may help correlate a failure with its time. A log entry or high utilization is evidence to interpret, not automatic proof of a root cause.',
 tech:'A spreadsheet freezes when a particular file opens while other apps respond. Capture the error, ask about recent changes, compare another file, and inspect the affected process before attempting repair.',
 goals:['Determine whether a failure affects one app or the system','Choose a useful diagnostic tool','Verify a repair against the original symptom'],
 flow:['Record symptom','Compare scope','Inspect evidence','Test and verify'],
 steps:[
 ['Protect work and describe the symptom','Ask what the user was doing and whether data is unsaved. Record the application, file, time, and error text without unnecessarily copying sensitive contents. Distinguish a slow operation from an unresponsive interface.'],
 ['Compare a small case','Check whether other applications respond and whether a different document opens. A failure involving one file suggests a narrower investigation than every application freezing. Reproduce only when safe and authorized.'],
 ['Inspect the relevant evidence','Task Manager can show CPU, memory, and disk pressure by process. Event Viewer may contain application errors near the incident time. Correlate observations with the symptom; do not end unknown system processes or treat every logged warning as the cause.'],
 ['Make one controlled change','If an application must be ended, explain the possible loss of unsaved work first. Follow an approved repair or update procedure based on evidence. Retest the original file and ordinary work, then record the outcome. A reboot that temporarily hides the symptom is not proof of root cause.']
 ],
 terms:[['Process','A running instance of a program.'],['Task Manager','A Windows tool for inspecting running processes and resource use.'],['Event Viewer','A Windows tool for inspecting recorded system and application events.']],
 lab:{task:'Paper lab: a spreadsheet stops responding on one file, a browser still works, and another spreadsheet file opens normally. Give two useful comparisons and explain why reinstalling the whole OS is premature.',answer:'Compare the affected file with a known-good file and check the app’s process activity plus relevant application logs at the failure time. Ask about file-specific add-ins or recent changes. The evidence narrows the symptom to one workflow; reinstalling the OS disrupts working functions without first testing that narrower cause.'},
 confusion:'High CPU use can be legitimate work. An application marked unresponsive may be waiting or busy; interpret the observation in context.',
 summary:['Determine the scope before selecting a repair.','Use process data and logs as evidence.','Protect unsaved work and retest the original symptom.'],
 checks:[
 ['One spreadsheet freezes on one document; other apps work. What is the best next comparison?','Try a known-good document in that app','Immediately reinstall the OS','Replace every network cable','A second document helps isolate file-specific behavior. Reinstalling the OS is premature, and cable replacement lacks supporting network evidence.'],
 ['Which Windows tool helps identify a process consuming memory?','Task Manager','Disk partition formatting','Screen resolution settings','Task Manager exposes process resource use. Formatting changes disk structures and risks data; screen settings do not identify process memory consumption.'],
 ['Before ending an unresponsive app, what matters to the user?','Potential loss of unsaved work','A guarantee that all work is already saved','A promise that the root cause is fixed','Ending a process can discard unsaved changes. Neither saved data nor a permanent fix is guaranteed by terminating the application.']
 ],tip:'Scope first, evidence next, then the smallest justified change.'
 },
 {
 id:'c2-support-records',title:'Support tickets: leave a useful trail',domain:4,objective:'4.1',minutes:20,
 big:'A support ticket connects the reported problem, its impact, your evidence, the actions taken, and the verified result. Good records let the next technician continue without guessing.',
 taglish:'Hindi sapat ang “fixed na.” Isulat ang symptom, affected users, ginawa mo, at test result. Huwag ilagay ang password o unnecessary personal data sa ticket.',
 analogy:'A relay runner hands over the baton and the current position. A ticket gives the next technician enough context to continue the work accurately.',
 exam:'Recognize ticket fields, severity and priority, escalation, and clear resolution documentation. Follow organizational rules for priority and service-level agreements rather than promising an arbitrary response time.',
 tech:'One user reports an issue that blocks payroll for the whole team. Record the business impact, affected service, and deadline; route or escalate according to policy.',
 goals:['Write an actionable issue description','Distinguish symptoms from conclusions','Record verification and an effective handoff'],
 flow:['Capture report','Record impact and evidence','Track actions','Verify and document'],
 steps:[
 ['Describe what was observed','Record who or which service is affected, when the problem began, and the exact error where appropriate. “Cannot open payroll share since 09:10” is more useful than “network broken,” which states an untested conclusion.'],
 ['Explain impact','Ask how many people are affected and what work is blocked. Use the organization’s severity and priority rules. One reporting user can represent a wider outage, so do not count reports as if they were the full scope.'],
 ['Document each meaningful action','Record the relevant test, result, change, and time. Keep credentials and unnecessary personal information out of the record. If approval is needed for a change, record its reference according to policy.'],
 ['Close or hand off clearly','Verify the original workflow with the user before recording resolution. If escalation is needed, include the current status, evidence, attempted actions, and outstanding next step. Avoid making the user repeat facts already collected.']
 ],
 terms:[['Ticket','A record of a support request or incident and its handling.'],['Escalation','Routing an issue to the appropriate authority or expertise.'],['SLA','Service-level agreement defining agreed service expectations.']],
 lab:{task:'Paper lab: replace this ticket note with a useful handoff: “User says network bad. Tried stuff. Still broken.” Assume the payroll share fails for three users, internet access works, and the issue is escalated to the file-service team.',answer:'Example: Three payroll users cannot access the payroll share; internet browsing works. Record the actual onset time and exact error if known, otherwise mark them as not yet confirmed. List the specific checks performed and results, business impact, and file-service team escalation. State that share access remains unresolved and needs investigation; do not invent a successful repair.'},
 confusion:'A plausible cause is not an observed fact. Keep the reported symptom, tested evidence, and working hypothesis distinct.',
 summary:['Record scope and business impact.','Describe actual actions and results.','Verify resolution or hand over an explicit next step.'],
 checks:[
 ['Which note best supports escalation?','Affected service, scope, test results, and unresolved symptom','Only “still broken”','The user’s password for convenience','Scope and evidence let the next team continue. “Still broken” lacks context, and passwords should not be recorded in tickets.'],
 ['One caller reports a payroll outage affecting a team. How should priority be assessed?','Use business impact and organizational priority rules','Always lowest priority because only one person called','Always highest priority without asking about impact','Priority follows impact and policy. The number of callers alone can underestimate scope, and automatic maximum priority ignores assessment.'],
 ['What supports closing a resolved ticket?','Documented verification of the original workflow','Only that a setting was changed','Deleting the history of failed tests','Verification demonstrates the user’s task works. A change alone is not evidence of resolution, and failed-test history may help future diagnosis.']
 ],tip:'Write what the next technician needs to know.'
 }
];
// Append new batches: original lesson numbers also seed answer rotation and must stay stable.
export const lessons=[...workshops,...core2OSLessons,...core2SecurityLessons,...core2RecoveryLessons,...core2PlatformLessons,...core2AccessLessons,...core2OperationsLessons,...core2DiagnosticLessons].map((l,i)=>({...l,number:i+1,question:l.checks[0][0],options:l.checks[0].slice(1,4),explanation:l.checks[0][4]}));
