// Original teaching and paper labs. Commands shown here are study examples, not executed.
export const core2OSLessons=[
{
 id:'c2-installation',title:'OS installation: plan before the first restart',domain:1,objective:'1.2 / 1.3',minutes:28,
 big:'An OS installation changes the software foundation of a device. Choose the installation method only after checking compatibility, licensing, user data, and a recovery plan.',
 taglish:'Bago mag-install, inventory muna: compatible ba ang hardware at apps, may license ba, at tested ba ang backup? Ang clean install ay bagong setup; ang upgrade ay may preservation goals pero hindi guaranteed na walang problema.',
 analogy:'Renovating an occupied house needs an inventory and a place for the belongings. A complete rebuild and a renovation that keeps existing rooms have different risks.',
 exam:'Compare clean installation, in-place upgrade, repair installation, and image deployment. Recognize USB and network boot methods, GPT and MBR partition styles, and the difference between Windows edition and version. Check the vendor’s requirements for the intended version.',
 tech:'An office is replacing a supported Windows version on a laptop that stores invoices locally. Confirm application support and activation, verify a recoverable backup, and agree on downtime before modifying partitions.',
 flow:['Inventory and compatibility','Verify backup and recovery','Choose deployment method','Install and validate'],
 goals:['Choose an installation method for a stated requirement','Separate partition style from filesystem','Plan post-installation verification'],
 terms:[['Clean install','A fresh OS installation requiring applications and settings to be established again.'],['In-place upgrade','An upgrade intended to retain supported apps, settings, and files along a supported path.'],['Image deployment','Installing a prepared system image for consistent configuration.'],['GPT','GUID Partition Table: a partition layout commonly used with UEFI boot.']],
 steps:[
 ['Inventory the starting point','Record the OS edition, version, architecture, hardware model, applications, and locally stored data. Edition describes a feature set such as Home or Pro; version describes the release. A machine meeting hardware requirements can still have an unsupported application or driver.'],
 ['Select the intended result','Use a supported in-place upgrade when preserving compatible apps and settings is required. A clean install starts fresh; image deployment helps standardize many machines. A repair installation addresses an existing OS through a supported repair path. None of these choices removes the need for a backup.'],
 ['Understand the disk choices','Partitioning defines areas on a disk; formatting creates a filesystem inside a volume. GPT and MBR describe partition layouts, not the filesystem used for documents. UEFI-based Windows deployment commonly uses GPT. Confirm the target disk and deployment instructions before making changes.'],
 ['Prepare and verify','Use approved installation media, a valid license, power, connectivity if required, and needed drivers. Verify the backup can be recovered before starting. Afterward check activation, updates, device support, security settings, application launch, and the user’s actual workflow. Record anything still unresolved.']
 ],
 lab:{task:'Paper lab: one laptop needs an approved upgrade while retaining a supported accounting app; twenty new desktops need the same approved configuration. Choose a method for each and list three checks before starting.',answer:'Use a supported in-place upgrade for the laptop if that exact path retains the required app, and an approved image deployment for the desktops. Check hardware and driver compatibility, application and licensing requirements, and a verified backup/recovery path for existing user data. Plan downtime and validate the accounting workflow after installation.'},
 confusion:'GPT and NTFS answer different questions: GPT organizes partitions; NTFS organizes files within a volume. An edition upgrade is also different from moving to a new OS version.',
 summary:['Inventory requirements and protect user data first.','Match the installation method to the desired result.','Verify the OS and the user’s work after deployment.'],
 related:['c2-os-foundations','c2-filesystems','c2-backups','c2-change-management'],
 checks:[
 ['Twenty new workstations need the same approved OS and application configuration. Which approach best supports consistency?','Deploy a prepared, approved image','Perform an in-place upgrade of each nonexistent old installation','Copy only a user’s Documents folder','Image deployment provides a consistent configured starting point. These new machines have no old installation to preserve, and copying documents does not deploy an OS or its applications.'],
 ['A technician sees GPT and NTFS in a deployment plan. What do they describe?','Partition layout and filesystem respectively','Two interchangeable Windows editions','Two types of backup retention','GPT describes partition structure and NTFS a filesystem. Neither is a Windows edition or a backup retention scheme.'],
 ['A supported upgrade is intended to preserve apps and files. What still belongs in the plan?','Verified backup and post-upgrade workflow tests','No backup because preservation is guaranteed','Only a new desktop wallpaper','Preservation is an installation goal, not protection against every failure. A tested backup and functional checks address actual recovery and compatibility needs; wallpaper does not.']
 ],tip:'Compatibility → recoverable backup → deployment → real-work validation.'
},
{
 id:'c2-filesystems',title:'Filesystems: capacity is only one requirement',domain:1,objective:'1.1 / 1.2',minutes:25,
 big:'A filesystem determines how a volume stores files and which features it offers. Choose it for file size, device compatibility, and required access controls, not just free space.',
 taglish:'May 20 GB free pero ayaw makopya ang isang 6 GB file? Check filesystem: may per-file limit ang FAT32. Ang free space at maximum file size ay magkaibang limit.',
 analogy:'A warehouse can have lots of empty shelves while every shelf is too short for one large box. Total room and the size of one allowed item are different constraints.',
 exam:'FAT32 has a maximum single-file size of 4 GiB minus one byte. exFAT supports larger files and is commonly useful for compatible removable-media workflows. NTFS supports Windows file permissions. Recognize APFS for Apple systems and ext4/XFS for Linux; actual read/write support depends on the OS and device.',
 tech:'A video editor needs to transfer a 6 GiB video between supported Windows and macOS systems. Check destination support and backup existing drive contents before considering exFAT. Do not format a drive that contains the only copy of important files.',
 flow:['Identify file and devices','Check filesystem features','Protect existing data','Choose and test'],
 goals:['Distinguish free capacity from a per-file limit','Match filesystem features to requirements','Explain why formatting requires preparation'],
 terms:[['Filesystem','The structure and rules for storing files on a volume.'],['NTFS','New Technology File System, with Windows access-control support.'],['FAT32','File Allocation Table 32, with a single-file limit just below 4 GiB.'],['exFAT','Extensible File Allocation Table, supporting larger files without NTFS-style permissions.'],['APFS','Apple File System, used on modern Apple platforms.']],
 steps:[
 ['Ask about one file and the whole volume','The drive’s available space and its largest supported individual file are separate. A 6 GiB video can fail on FAT32 even when far more than 6 GiB is free. Record the error, file size, volume capacity, and current filesystem before choosing an action.'],
 ['Match the feature requirement','For a Windows volume requiring file-level access control, NTFS is a common choice. For a removable disk shared by compatible Windows and macOS systems, exFAT can fit large-file transfer. exFAT does not provide the same access-control features as NTFS.'],
 ['Check the actual reader','A camera, console, or older appliance may support only specific formats. APFS, ext4, and XFS are associated with particular platform ecosystems, but built-in support and third-party tools vary. Check both endpoints rather than assuming every OS reads and writes every filesystem.'],
 ['Change only with a recovery plan','Formatting changes the volume and can make existing files inaccessible. Copy and verify needed data elsewhere, confirm the exact destination, and follow the approved procedure. Test representative files after a change. Formatting is not a substitute for diagnosing a failing disk.']
 ],
 lab:{task:'Paper lab: a FAT32 USB drive has 20 GiB free. A 6 GiB video fails to copy. Both destination computers support exFAT. Explain the failure and a plan that preserves existing files.',answer:'The video exceeds FAT32’s single-file limit even though total free capacity is sufficient. Verify the error and filesystem, copy existing USB contents to safe storage and confirm they can be read, then use an approved exFAT format if permitted. Restore needed contents and test the 6 GiB transfer on both computers.'},
 confusion:'A format changes storage organization; it does not grant every filesystem the same permissions or make unsupported devices compatible.',
 summary:['Check individual file size as well as capacity.','Match compatibility and security features.','Verify a backup before formatting.'],
 related:['c2-installation','c2-permissions','c2-backups'],
 checks:[
 ['A 6 GiB video fails on a healthy FAT32 drive with 20 GiB free. What is the strongest clue?','FAT32’s per-file size limit','The drive must have no free capacity','NTFS permissions on the FAT32 volume','The single file exceeds FAT32’s limit. The stated capacity is enough, and FAT32 does not implement NTFS-style file permissions.'],
 ['A Windows data volume needs file-level permissions. Which option fits that requirement?','NTFS','exFAT because it has identical access controls','FAT32 because capacity determines permissions','NTFS supplies Windows file access controls. exFAT and FAT32 do not offer equivalent NTFS permissions, and capacity does not determine access rights.'],
 ['Before reformatting a USB drive that contains user files, what is required?','Verify needed data is recoverable elsewhere and confirm the target','Assume a quick format preserves accessible files','Format every attached drive for consistency','A verified copy and correct-target check protect data. A quick format still changes the filesystem, and formatting unrelated drives introduces unnecessary loss.']
 ],tip:'Enough free space does not guarantee a large file will fit.'
},
{
 id:'c2-windows-tools',title:'Windows tools: choose the question first',domain:1,objective:'1.4',minutes:26,
 big:'Windows management tools answer different questions about the same computer. Select the tool that exposes the evidence needed for the current symptom.',
 taglish:'Task Manager para sa running processes; Device Manager para sa devices at drivers; Event Viewer para sa logged events. Hindi pareho ang trabaho nila kahit lahat nasa Windows.',
 analogy:'A doctor uses a thermometer for temperature and an X-ray for a bone. The best tool depends on the question, not on which tool looks most powerful.',
 exam:'Recognize Task Manager, Device Manager (devmgmt.msc), Event Viewer (eventvwr.msc), Disk Management (diskmgmt.msc), Task Scheduler (taskschd.msc), and System Information (msinfo32). Management console availability and privileges vary by edition and policy.',
 tech:'After a driver update, a USB camera stops working. Confirm the symptom and inspect the device’s status and driver details. A processor graph alone cannot explain whether that device reports an error.',
 flow:['State the question','Choose the relevant tool','Interpret evidence','Test a justified action'],
 goals:['Match common tools to diagnostic questions','Separate observation from modification','Correlate event evidence with an incident'],
 terms:[['Device Manager','A tool showing detected devices, status, and driver information.'],['Event Viewer','A tool for inspecting Windows event logs.'],['Disk Management','A tool for inspecting and managing disks, partitions, and volumes.'],['Task Scheduler','A tool for scheduled tasks and their execution settings.']],
 steps:[
 ['Inspect a running workload','Task Manager shows processes and resource use. Compare CPU, memory, and disk activity with the observed delay. A high value can reflect legitimate work; killing an unfamiliar process is not a diagnosis.'],
 ['Inspect a device or volume','Device Manager exposes device status and driver information. Disk Management shows disk and volume layout, filesystem, and drive letters. Inspect before changing anything: initializing or formatting a disk can endanger data that needs recovery.'],
 ['Read events in context','Event Viewer records events with times, sources, and identifiers. Look near the reported failure and compare repeated behavior. A warning from yesterday may be unrelated to today’s incident; a correlated error suggests a next check rather than proving the whole cause.'],
 ['Inspect configuration and scheduled work','System Information reports hardware and system details useful for inventory. Task Scheduler helps investigate a job that should run at a specific time; check its trigger, account, conditions, and history where available. Record findings, then choose an approved action and verify the result.']
 ],
 lab:{task:'Paper lab: choose a tool for each question: which process consumes memory; which driver a camera uses; whether a data disk has a drive letter; whether a nightly task ran. Explain one action you should avoid while gathering evidence.',answer:'Use Task Manager for process memory, Device Manager for camera driver details, Disk Management for volume/drive-letter information, and Task Scheduler for the scheduled job. Avoid initializing or formatting a data disk during inspection, and avoid terminating unknown processes merely because their names are unfamiliar.'},
 confusion:'Device Manager and Disk Management are distinct. A device being detected does not prove its volume is mounted or that the user has permission to its files.',
 summary:['Choose a tool from the diagnostic question.','Inspect status before making changes.','Correlate logs and verify the resulting fix.'],
 related:['c2-app-troubleshooting','c2-windows-commands','c2-recovery'],
 checks:[
 ['A camera stopped working after a driver update. Where can you inspect its device status and driver?','Device Manager','Task Scheduler’s calendar trigger','A browser’s history list','Device Manager exposes device and driver information. A calendar trigger controls scheduled work, and browser history does not report camera driver status.'],
 ['You need to inspect an existing data volume’s drive letter. Which tool fits?','Disk Management','Event Viewer alone','An application uninstall wizard','Disk Management exposes the volume layout and drive letters. Logs may provide related events but are not the primary layout tool; uninstalling an application does not inspect the volume.'],
 ['An Event Viewer warning exists near a crash. What is the sound interpretation?','Correlate it with the symptom and other evidence','Every warning must be the root cause','Delete the log to repair the application','Time correlation can guide diagnosis but does not prove causation. Deleting evidence does not repair the application, and unrelated warnings are common.']
 ],tip:'Process, device, volume, event, scheduled job: name the question.'
},
{
 id:'c2-windows-commands',title:'Windows commands: read the output, choose the next test',domain:1,objective:'1.5',minutes:30,
 big:'A command is useful when you understand what it measures and how its output changes your next decision. Start with information before using commands that modify the system.',
 taglish:'Hindi sapat na kabisado ang command. Basahin ang result: ipconfig para sa network settings, nslookup para sa DNS, whoami para sa current identity. Huwag gawing automatic fix ang format o diskpart.',
 analogy:'A checklist of road signs helps only if you use each sign to choose a route. Diagnostic output is a clue that directs the next test.',
 exam:'Match dir and cd to navigation; ipconfig to IP configuration; nslookup to DNS queries; ping to ICMP reachability; whoami to the current security identity; sfc to protected Windows system files; and chkdsk to filesystem/volume checking. Options determine whether a command only observes or attempts changes.',
 tech:'A workstation reaches a known service by IP but hostname access fails. Inspect configured DNS servers using ipconfig /all and query the relevant name using nslookup. Confirm the failing application before claiming that a successful ping proves everything works.',
 flow:['Define the failed layer','Inspect configuration','Run a focused test','Interpret and verify'],
 goals:['Match commands to their purpose','Interpret DNS versus connectivity evidence','Distinguish information gathering from repair actions'],
 terms:[['ipconfig /all','Displays detailed adapter and TCP/IP configuration.'],['nslookup','Queries DNS records using a DNS server.'],['whoami','Reports the identity of the current security context.'],['SFC','System File Checker, for protected Windows system files.'],['chkdsk','Checks a filesystem and volume; repair behavior depends on options.']],
 steps:[
 ['Navigate and identify','In Command Prompt, dir lists a directory and cd changes the current directory. whoami identifies the current account context; hostname identifies the device name. Use command /? for built-in help when available. Shells can have different syntax, so identify the shell before following a procedure.'],
 ['Read network settings','ipconfig /all shows addresses, gateway, DNS configuration, and adapter details. It does not itself fix those settings. Compare the relevant connected adapter with the intended network; virtual adapters and disconnected interfaces can otherwise distract you.'],
 ['Test one layer at a time','nslookup checks a DNS lookup. ping tests an ICMP exchange, which can be filtered even when an application service is available. tracert can show responding hops, but missing replies alone do not prove a router is down. Test the application’s actual service as well.'],
 ['Know the scope of repair','sfc /scannow checks protected Windows system files and attempts repair; it is not a general document recovery tool. chkdsk /f requests filesystem error repair and may need a locked volume or restart. format and some diskpart operations change storage destructively. Use repair commands only with evidence, recovery preparation, and an approved procedure.']
 ],
 lab:{task:'Paper lab: ipconfig /all shows DNS server 192.168.10.2. The workstation can access a known server by IP, but nslookup for its hostname times out. Give a focused next investigation and explain why running sfc is not your first DNS test.',answer:'Check reachability and availability of the configured DNS service, compare configuration and lookup results with a working client, and confirm the name being queried. IP service access is evidence that at least that path works. SFC checks protected Windows files; it does not directly test whether the selected DNS server answers this query.'},
 confusion:'A successful ping does not prove an application port is open. A failed ping does not prove the target is unavailable. DNS lookup and application access also test different layers.',
 summary:['Choose a command for a specific question.','Interpret output on the relevant adapter and service.','Separate observation, repair, and destructive storage operations.'],
 related:['c2-windows-tools','c2-recovery','c2-support-records'],
 checks:[
 ['A host responds by IP but its hostname fails. Which command directly investigates the name lookup?','nslookup','sfc /scannow','format','nslookup queries DNS for the name. SFC checks protected system files, while format changes a volume and is unrelated to name resolution.'],
 ['Which command shows the identity running the current Command Prompt?','whoami','hostname','dir','whoami reports the current identity. hostname reports the computer name, and dir lists directory contents.'],
 ['Which description of sfc /scannow is accurate?','Checks protected Windows system files and attempts repair','Restores every deleted personal document','Changes the partition layout to GPT','SFC concerns protected OS files. It is neither a general user-file recovery command nor a partition conversion command.']
 ],tip:'Choose the command by the layer; choose the next step by its output.'
},
{
 id:'c2-linux-basics',title:'Linux: paths, files, and permission clues',domain:1,objective:'1.9',minutes:28,
 big:'Linux command-line work starts with knowing your current directory, the path to a file, and the permissions involved. Small, readable commands help you understand each step.',
 taglish:'Sa Linux, alamin muna kung nasaan ka gamit ang pwd. Ang ls ay listahan; cd ay lipat directory. Case-sensitive ang common Linux filesystems: Report.txt at report.txt can be different files.',
 analogy:'A building directory lists the rooms, while the address tells you which room you are standing in. Door permissions decide who may enter or change what is inside.',
 exam:'Recognize pwd, ls, cd, cat, grep, cp, mv, rm, chmod, chown, and sudo. Basic permissions are read, write, and execute for owner, group, and others. For a regular file, mode 640 gives owner read/write, group read, and others no access in the basic mode bits.',
 tech:'A team member cannot read a log file. Inspect the file path, ownership, and permissions first. Do not respond by granting everyone write access or running every command as root.',
 flow:['Locate the file','Inspect metadata','Read permitted evidence','Adjust only approved access'],
 goals:['Read absolute and relative paths','Interpret basic file permission digits','Recognize commands that change or delete data'],
 terms:[['Absolute path','A path starting from the root directory /, such as /var/log/example.log.'],['Relative path','A path interpreted from the current working directory.'],['chmod','Changes basic file permission modes.'],['sudo','Runs an authorized command as another user, commonly root.']],
 steps:[
 ['Locate before acting','pwd prints the current working directory. ls lists entries; ls -l adds metadata such as owner and permissions. cd changes directories. /var/log/example.log is absolute, while logs/example.log is relative to the current location. Common Linux filesystems treat letter case as significant.'],
 ['Read and search','cat prints file contents; grep selects lines matching a pattern. A paper example is grep ERROR sample.log. Verify the file is the intended one and avoid copying sensitive logs into public places. A missing match does not establish that no fault occurred; the application may use different text or another log.'],
 ['Read basic permissions','For regular files, read permits reading contents, write permits changes, and execute permits execution. Numeric values are read 4, write 2, execute 1; add them for owner, group, and others. 640 is 6=4+2, 4=read, 0=none. Directory execute instead controls traversal, and ACLs or other controls can also affect effective access.'],
 ['Recognize changes and privilege','cp copies, mv moves or renames, and rm removes entries; deletion may not provide a desktop trash recovery path. chmod changes modes, while chown changes ownership. sudo depends on policy and may request authentication; it is not a reason to bypass an unexplained permission error. Inspect and request the narrow intended change.']
 ],
 lab:{task:'Paper lab: a regular file report.txt has mode 640 and is owned by maria with group support. Interpret owner, group, and others permissions. From /home/maria, compare report.txt and /var/log/report.txt.',answer:'The basic mode grants maria read and write, support group read, and others no access. It grants no execute bit. report.txt refers to a file relative to /home/maria, while /var/log/report.txt is an absolute path under /var/log. These can be different files; effective access can also depend on directory traversal and additional controls.'},
 confusion:'Execute on a directory concerns traversal, not running the directory as a program. chmod changes permissions; chown changes ownership.',
 summary:['Confirm location and exact letter case.','Read owner/group/others permission bits.','Use privileged or deleting commands only for a justified task.'],
 related:['c2-os-foundations','c2-permissions','c2-windows-commands'],
 checks:[
 ['Which Linux command reports the current working directory?','pwd','chmod','chown','pwd reports location. chmod changes modes, and chown changes ownership; neither is a location query.'],
 ['For a regular file with basic mode 640, what does the group receive?','Read permission','Read and write permission','Execute permission','The middle digit 4 represents read only. Read/write is 6 and execute includes value 1; neither appears in the group digit.'],
 ['An approved task requires changing ownership rather than basic mode bits. Which command matches?','chown','chmod','cat','chown changes ownership. chmod changes permissions, while cat displays contents and does not change either setting.']
 ],tip:'pwd → exact path → ownership and modes → justified action.'
}
];
