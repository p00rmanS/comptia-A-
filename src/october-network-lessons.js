// Original paper workshops. Append to retain existing question identities.
export const octoberNetworkLessons=[
 {
 id:'ethernet-link-lab',title:'Ethernet link lab: connected but unreliable',domain:5,objective:'5.5',minutes:26,
 big:'A link light shows a physical connection, but negotiated speed, errors, and application behavior tell you whether that connection is useful.',
 taglish:'May link light pero mabagal pa rin? Tingnan ang negotiated speed, error counters, cable, at settings sa magkabilang dulo. Hindi sapat ang connected icon para sabihing healthy ang buong network.',
 analogy:'An open road can still have damaged lanes and congestion. An open Ethernet link does not tell you how well traffic travels.',
 exam:'Investigate intermittent connectivity and slow transfer speed using scope, link status, cabling, and interface evidence. Duplex mismatch is supporting diagnostic context; avoid assuming that every slow link has this fault.',
 tech:'A workstation transfers files slowly while a neighbor works normally. Compare its cable, switch port, negotiated speed, and error-counter changes before replacing the switch.',
 flow:['Define affected path','Inspect link and counters','Compare one variable','Retest the workload'],
 goals:['Distinguish link presence from link health','Interpret speed and error evidence','Verify a controlled repair'],
 terms:[['Negotiation','Endpoints agreeing on supported link settings.'],['Full duplex','Transmission and reception can occur simultaneously on the link.'],['CRC/FCS error','A frame integrity check failed; this is evidence to investigate, not a unique diagnosis.']],
 steps:[
 ['Describe the actual failure','Record whether one client or many are affected, when the issue began, and which transfers fail. A slow internet download and a slow local file copy traverse different paths; collect evidence for the path that matters.'],
 ['Read both endpoints','Compare expected and negotiated speed at the adapter and authorized switch interface. Rising integrity-error counters can support investigating a cable, port, adapter, or configuration issue. An old cumulative count alone does not show a current failure.'],
 ['Make a controlled comparison','Replace an accessible patch cable with a known suitable cable, then repeat the same transfer. Inspect approved speed/duplex configuration on both ends; avoid forcing one side while leaving incompatible settings on the other. Follow the network administrator’s design.'],
 ['Verify more than a light','Repeat the original transfer and compare new error increments during the same observation interval. Record the changed component and results. A restored link light alone does not establish that intermittent loss or low throughput has been resolved.']
 ],
 lab:{task:'Paper lab: client A links at 100 Mb/s although the expected path supports 1 Gb/s. Its error counter rises from 20 to 220 during a test. Client B is normal. A known-good patch cable restores 1 Gb/s and no new errors appear during the same test. What conclusion is justified?',answer:'The controlled cable comparison strongly implicates the original patch cable or its connection, and the retest supports improved operation. The first test produced 200 additional errors; the old total of 20 alone was not the key evidence. Document negotiated speed, error increments, workload result, and the cable change. Do not claim all network paths or every future failure are proven healthy.'},
 confusion:'CRC errors do not uniquely identify duplex mismatch. Physical faults and other interface issues can also produce errors.',
 summary:['Compare the affected path with a working one.','Measure new errors during a defined interval.','Retest after one approved change.'],related:['no-internet','router-switch'],
 checks:[
 ['A link light is on, but file copies fail intermittently. What follows?','Check link settings and errors along the affected path','The light proves all transfers are healthy','Replace every network device immediately','Link presence is limited evidence. Interface settings and measured errors help isolate a fault; wholesale replacement is unsupported.'],
 ['An error counter changes from 20 to 220 during a test. How many new errors occurred?','200','220','20','Subtract the baseline: 220 minus 20 is 200. A cumulative total must be compared over an interval to describe new errors.'],
 ['Only one workstation is slow. A known-good patch cable restores expected speed. What is the best next step?','Repeat the original workload and document the result','Declare the entire network permanently healthy','Reinstall the OS without testing','Verification connects the cable change to the original symptom. It cannot guarantee all paths forever, and an OS reinstall is not justified by this evidence.']
 ],tip:'Link presence, negotiated speed, and useful throughput answer different questions.'
 },
 {
 id:'transfer-speed-lab',title:'Transfer speed lab: bits, bytes, and bottlenecks',domain:5,objective:'5.5',minutes:25,
 big:'Link speed is a capacity figure; actual transfer time depends on protocol overhead and the slowest effective part of the path.',
 taglish:'Mb/s is megabits per second; MB/s is megabytes per second. Divide bits by eight bago magkumpara. Pero theoretical ceiling lang iyon: may overhead, storage limits, at shared traffic.',
 analogy:'A conveyor’s rated speed does not guarantee that a worker can load boxes at that rate. The slowest stage limits the completed job.',
 exam:'Use transfer-speed observations to investigate slow networking. The arithmetic is supporting practice for bottleneck reasoning, not a promise that a link will achieve its advertised rate.',
 tech:'A 1 Gb/s wired path copies at 30 MB/s. Compare source and destination storage, traffic, negotiated links, and workload before deciding that the Ethernet adapter is faulty.',
 flow:['Choose consistent units','Compute ideal ceiling','Compare actual path','Test one bottleneck'],
 goals:['Convert bits and bytes correctly','Estimate an ideal transfer floor','Separate a bottleneck clue from a diagnosis'],
 terms:[['Bit','A binary digit; eight bits make one byte.'],['Throughput','The achieved transfer rate during a measurement.'],['Bottleneck','The stage limiting effective performance for a particular workload.']],
 steps:[
 ['Check capitalization and units','Networking commonly advertises bits per second, while a copy dialog may display bytes per second. In this exercise use decimal MB and Mb: 1 MB equals 8 Mb. Binary MiB is a different unit, so keep the calculation consistent.'],
 ['Calculate the ideal limit','A 100 Mb/s link has an ideal ceiling of 12.5 MB/s before overhead. A decimal 500 MB file would take at least 40 seconds at that ceiling. Real transfer time is longer when overhead or other bottlenecks reduce effective throughput.'],
 ['Trace the complete workload','The source drive, destination drive, intermediate links, contention, latency, and application behavior can limit a copy. A gigabit adapter alone does not make every path gigabit; inspect the negotiated link and shared infrastructure too.'],
 ['Use a fair comparison','Repeat a representative test with the same endpoints and workload, changing one approved factor. Record file size, elapsed time, effective rate, and path. Small-file collections may behave differently from one large file, so avoid comparing unlike workloads.']
 ],
 lab:{task:'Paper lab: a decimal 500 MB file crosses a 100 Mb/s link. Calculate the ideal minimum time. The actual copy takes 80 seconds. Find its achieved MB/s and explain why this does not by itself prove a damaged cable.',answer:'100 Mb/s divided by eight is 12.5 MB/s. The ideal minimum is 500 divided by 12.5, or 40 seconds, excluding overhead. The observed rate is 500 divided by 80, or 6.25 MB/s (50 Mb/s). This gap can reflect overhead, storage, contention, or application behavior; compare negotiated speed and error evidence before diagnosing a cable fault.'},
 confusion:'A 100 Mb/s link is not a 100 MB/s link. An ideal calculation is a limit, not a measured guarantee.',
 summary:['Convert bits to bytes by dividing by eight.','Treat calculated time as an ideal floor.','Investigate the whole transfer path.'],related:['ethernet-link-lab','ram-storage'],
 checks:[
 ['Using decimal units, what is the ideal byte rate of a 100 Mb/s link?','12.5 MB/s','100 MB/s','800 MB/s','Eight bits make one byte, so divide 100 by eight. Actual useful throughput is lower when overhead or bottlenecks apply.'],
 ['A decimal 500 MB copy takes 80 seconds. What is its achieved rate?','6.25 MB/s','40 MB/s','80 MB/s','Divide file size by time: 500 divided by 80 equals 6.25 MB/s. Neither the duration nor an ideal-time estimate is the measured rate.'],
 ['A gigabit path copies at 30 MB/s. What is justified?','Investigate storage, links, traffic, and workload limits','The adapter is definitely broken','The network must be encrypting nothing','The observed rate is a starting clue, not a unique cause. Storage and workload can constrain throughput; it says nothing conclusive about encryption.']
 ],tip:'Use the same units and workload before comparing numbers.'
 }
].map(l=>({...l,question:l.checks[0][0],options:l.checks[0].slice(1,4),explanation:l.checks[0][4]}));
