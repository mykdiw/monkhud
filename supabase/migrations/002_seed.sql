-- ═══════════════════════════════════════════════════════════════════
-- MONK HUD — Seed Data
-- Migration: 002_seed.sql
-- Run AFTER 001_schema.sql
-- ═══════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────
-- PRODUCTS — The 16 Companions
-- Prices in INR (converted from USD at ₹83, rounded to clean numbers)
-- Edit freely in Supabase Dashboard → Table Editor → products
-- ─────────────────────────────────────────────────────────────────
insert into public.products (id, slug, name, category, emoji, price_inr, orig_inr, badge, badge_type, rating, review_count, description, pick, creature_text, monks_notes, specs, tags, in_stock, stock_qty, is_new, is_sale, is_featured, sort_order) values

(1, 'patient-owl',
 'Patient Owl', 'mice', '🖱️',
 7400, null, 'Bestseller', '',
 4.8, 0,
 'Wireless. 26K sensor. 55g. Moves when the moment calls for it — otherwise, still.',
 'The lightest wireless sensor at this price. It weighs 55g and disappears from your hand. That is exactly what it should do.',
 'The owl is not the fastest bird in the forest. It is the most precise. It waits motionless for hours, tracking with extraordinary resolution, then moves once — with absolute certainty. The Patient Owl mouse was named for this quality. Not for speed. For the silence between movements.',
 'I looked for a mouse that would stop announcing itself. This is it. 55 grams means the hand forgets it is there. The sensor resolves at any speed. On good days I forget I am using a tool at all, which is the highest thing a tool can achieve. — The Monk',
 '{"Weight":"55g","DPI":"100–26,000","Battery":"70hr","Connection":"2.4GHz / USB-C","Polling":"1000Hz"}',
 ARRAY['gamer','creator'],
 true, 85, false, false, true, 1),

(2, 'silent-viper',
 'Silent Viper', 'keyboards', '⌨️',
 12400, null, 'New Drop', 'new',
 4.9, 0,
 'Coiled. Strikes precisely. Quiet until it moves.',
 'Hot-swap and CNC aluminium at this price is unheard of. Every keystroke is deliberate. The name earned itself.',
 'The common krait is one of the most dangerous snakes in the subcontinent — but not because it is fast or aggressive. It is because it is silent. A krait rarely bites during the day. It waits, coiled, almost invisible in the leaf litter, and strikes only when it must. Every movement is deliberate. Nothing is wasted. The monk once watched a krait for two hours in a Wayanad clearing and it moved exactly four times.',
 'I carried this keyboard for six months before it earned its name. What I wanted was something that did its work and stayed out of the way. 1,180 grams of aluminium. Gasket-mounted. A sound that is almost no sound. When I type on it I forget it is there, which is the highest thing a tool can achieve. — The Monk',
 '{"Layout":"75%","Switches":"Custom Tactile","Case":"CNC Aluminum","RGB":"South-facing","Weight":"980g"}',
 ARRAY['gamer','builder'],
 true, 60, true, false, true, 2),

(3, 'lone-gibbon',
 'Lone Gibbon', 'audio', '🎧',
 16500, null, null, '',
 4.2, 0,
 'Open-back. 250Ω. For the still practice — hears what others miss.',
 'Open-back at 250Ω for under ₹17,000. The Lone Gibbon hears details most headphones hide. Essential for the Still Path.',
 'The gibbon does not live in flocks. It moves alone through the high canopy, navigating by sound as much as sight. Its calls carry kilometres through dense forest — the product of extraordinary auditory precision. The Lone Gibbon headphone was named for this quality: designed for the monk who works alone, who needs to hear every detail in the silence of a long session.',
 'I bought these for colour grading. After two months I use them for everything. Open-back means the room breathes through the music — a strange intimacy. At 250 ohms they need the Dhole to drive them properly. Together they reveal things in recordings I had not heard before. — The Monk',
 '{"Type":"Open-back","Drivers":"50mm","Impedance":"250Ω","Frequency":"10Hz–35kHz","Weight":"330g"}',
 ARRAY['creator'],
 true, 40, false, false, true, 3),

(4, 'firefly',
 'Firefly', 'lighting', '💡',
 4900, 6600, 'Sale', 'sale',
 4.1, 0,
 'Magnetic. 16M colours. Anti-glare diffuser. Lights the desk, not the eyes.',
 'The diffuser panel is what separates this from every other RGB strip. It lights the surface, not your face. The name is exact.',
 'The firefly does not illuminate the landscape. It illuminates itself — a precise, contained signal in the dark. The Firefly desk bar follows this principle. Its diffuser panel spreads light across the desk surface without creating glare or hotspots. The light tells you where things are. It does not blind you to them.',
 'The anti-glare diffuser is the detail no one mentions in the spec sheet but everyone notices immediately. Other bars throw light at you. The Firefly throws it at the desk. After a week your eyes stop straining. You stop noticing the light. The desk simply becomes visible. — The Monk',
 '{"Length":"80cm","Colors":"16M RGBW","Control":"App + Touch","Power":"USB-C","Brightness":"2000 lux"}',
 ARRAY['gamer','creator'],
 true, 120, false, true, true, 4),

(5, 'great-hornbill',
 'Great Hornbill', 'mounts', '🖥️',
 9900, null, 'Hot', 'hot',
 4.8, 0,
 'Full-motion. Dual monitor. Cable channel built in. Flagship of the Mounts.',
 'Full-motion with integrated cable management. Your desk surface reclaims 40% more space. One Companion does the work of three.',
 'The Great Hornbill spends most of its life in the Indian forest canopy. It is one of the largest birds in the subcontinent — but what defines it is its relationship to height and positioning. When it moves its head, it moves with absolute purpose: one slow rotation that takes in everything below without disturbing the branch. A monitor arm should work exactly this way. Full motion available. Motion rarely used.',
 'Before the Great Hornbill, my monitors were on risers. The desk was cluttered with legs and supports. One afternoon I removed everything and mounted both screens. The desk surface doubled. The cable channel meant the remaining cables vanished. I have adjusted the arm exactly three times since. It has earned its name. — The Monk',
 '{"Max_Size":"32 inch","VESA":"75×75, 100×100","Load":"10kg/arm","Reach":"410mm","Tilt":"±45°"}',
 ARRAY['builder','creator'],
 true, 45, false, false, false, 5),

(6, 'langur',
 'Langur', 'accessories', '🟫',
 3700, null, null, '',
 4.9, 0,
 '900×400mm. Micro-weave. Stitched edge. Covers the whole clearing.',
 '900×400mm covers the entire clearing. Micro-weave means the mouse and the keyboard both move honestly. The Langur asks for nothing.',
 'The langur is a large grey monkey of the Indian subcontinent, known for its unhurried presence at the edge of clearings. It does not rush. It spreads its weight evenly and occupies its space completely. The Langur deskpad follows this logic: 900×400mm, heavy enough to stay without grip, covering everything so nothing moves unnecessarily.',
 'I used a small pad for years because I thought it was enough. Then I switched to the Langur and understood the difference. Mouse and keyboard both sit on the same surface. Everything moves consistently. The stitched edge has not frayed. After six months it looks exactly as it did on the first day. That is the quality that matters. — The Monk',
 '{"Size":"900×400mm","Thickness":"4mm","Surface":"Micro-weave","Base":"Non-slip rubber","Edge":"Stitched"}',
 ARRAY['gamer','builder'],
 true, 200, false, false, false, 6),

(7, 'dhole',
 'Dhole', 'audio', '🔊',
 6600, null, 'New Drop', 'new',
 4.0, 0,
 'Portable DAC/Amp. Powers 300Ω headphones from USB-C. Audiophile-grade from a single cable.',
 'The gap between laptop audio and this is not small. Powers the Lone Gibbon at full capacity from a single USB-C cable.',
 'The dhole is a wild dog of the Indian forest — small, efficient, operating in silence. It does not announce itself. It simply appears, does its work, and moves on. The Dhole DAC/Amp has this quality: it is small enough to leave on the desk permanently, quiet in operation, and does its work at a level far above what its size suggests.',
 'I kept putting off a DAC because I thought the difference was audiophile myth. I was wrong. The first time I ran the Lone Gibbon through the Dhole, I heard reverb tails in recordings I had heard hundreds of times without noticing. The improvement is not subtle. It is architectural. — The Monk',
 '{"Output":"3.5mm + 4.4mm","Gain":"Low/High","SNR":">115dB","Input":"USB-C","Power":"1000mW@32Ω"}',
 ARRAY['creator'],
 true, 55, true, false, false, 7),

(8, 'vine',
 'Vine', 'accessories', '🔌',
 2400, null, null, '',
 4.1, 0,
 'Magnetic clips, spine covers, velcro wraps. The clearing begins here.',
 'Cables are the first thing chaos uses to take over a desk. The Vine ends it in ten minutes. Start here.',
 'The vine does not dominate the forest. It follows existing structures, binds them together, and makes order from what would otherwise sprawl. The Vine cable kit follows this principle: magnetic clips that guide, spine covers that conceal, velcro wraps that bind. In ten minutes, a desk that was chaos becomes a clearing.',
 'The first thing I tell anyone building a new desk: start with the Vine. Not the keyboard. Not the mouse. The cables. A desk with perfect peripherals and loose cables still looks like a desk that does not care. Get the cables right first and everything that follows looks intentional. — The Monk',
 '{"Clips":"12×magnetic","Spine":"60cm","Wraps":"20×velcro","Color":"Matte Black","Material":"ABS"}',
 ARRAY['builder','creator'],
 true, 300, false, false, false, 8),

(9, 'ashwing',
 'Ashwing', 'keyboards', '🎨',
 5700, null, 'New Drop', 'new',
 4.9, 0,
 'Double-shot PBT. Dark colorway. 136 keys. Designed for the Hud.',
 'Double-shot PBT that will not fade. The dark colorway was designed specifically for the Hud aesthetic. Passes the Attenborough Test: something ancient, patient, airborne.',
 'The ashwing is a creature of patience and altitude. It moves in long thermal arcs, barely beating its wings, reading the air. Named for this quality — something that moves above the surface noise, waiting for the right moment. The Ashwing keycap set was designed for the monk who types for hours and needs the keycaps to still look right at the end of a year.',
 'I have used PBT keycaps that started fading within three months. The Ashwing set has been on my board for eleven months and the legends are as sharp as day one. The dark colorway photographs beautifully. The Cherry profile is my preferred height. This is the keycap set I recommend to everyone. — The Monk',
 '{"Material":"Double-shot PBT","Profile":"Cherry","Keys":"136","Compatibility":"MX stem","Legends":"Side-lit"}',
 ARRAY['gamer','builder'],
 true, 80, true, false, false, 9),

(10, 'still-krait',
 'Still Krait', 'lighting', '🌟',
 3200, 4600, 'Sale', 'sale',
 3.9, 0,
 'RGBIC bias lighting. Reduces eye strain. The monitor no longer floats in darkness.',
 'RGBIC bias light that reduces eye strain on ten-hour sessions. The monitor no longer floats in darkness. The Still Krait holds its position.',
 'The krait at rest is almost invisible. It coils motionless in the leaf litter, merging with its surroundings, maintaining its position for hours. The Still Krait bias light has this quality: present, functional, unobtrusive. It does not demand attention. It simply reduces the contrast between your monitor and the wall behind it, making long sessions easier on the eye.',
 'I resisted bias lighting for a long time. It felt decorative. I was wrong — the purpose is functional. With the Still Krait behind the monitor, the harsh edge between bright screen and dark wall disappears. After a week I stopped noticing the light and noticed only that my eyes felt less tired at the end of the day. — The Monk',
 '{"Length":"2m","Colors":"RGBIC","Control":"App","Power":"USB","CRI":">90"}',
 ARRAY['creator','builder'],
 true, 150, false, true, false, 10),

(11, 'forest-cobra',
 'Forest Cobra', 'keyboards', '⌨️',
 8200, null, null, '',
 3.9, 0,
 '60% wireless. Three Bluetooth devices. Six weeks of battery. Goes everywhere.',
 '60% layout frees 40% of the clearing. Three Bluetooth devices. Six weeks of charge. The Code Monk''s travel Companion.',
 'The forest cobra is the longest cobra in Africa — but it is the 60% layout of cobras. Compact, efficient, capable of moving through tight spaces that larger species cannot navigate. The Forest Cobra keyboard follows this logic: 60% layout means it fits in a bag, on a plane tray, on a hotel desk. Three Bluetooth devices mean it switches between laptop, tablet, and phone without a cable.',
 'I use this when I travel and increasingly when I do not. The 60% layout forced me to learn keyboard shortcuts I had been avoiding for years. The desk space it returns is significant. Six weeks of battery means I charge it with the phone on Sunday nights. It has become the keyboard I reach for first. — The Monk',
 '{"Layout":"60%","Battery":"6 weeks","Devices":"3×BT + USB-C","Switch":"Red Linear","Profile":"OEM"}',
 ARRAY['builder','creator'],
 true, 70, false, false, false, 11),

(12, 'terrapin',
 'Terrapin', 'accessories', '🟦',
 2900, null, null, '',
 4.8, 0,
 'Hard surface. Ultra-fast glide. Consistent edge to edge. No dead zones.',
 'Hard surface for precise practice. Glide is consistent from edge to edge. The Terrapin moves slowly and tracks everything.',
 'The terrapin moves slowly. But it tracks everything. It misses nothing that passes through its field of vision. The Terrapin mouse pad has this quality — a hard polymer surface that registers every movement with equal precision, from the centre to the edge. No dead zones. No variation. The same feedback at low sensitivity as at high.',
 'I switched to hard surface three years ago and have not returned to cloth. The Terrapin is the best I have used: consistent glide, no dead zones at the edges, rubber base that does not shift. It is 3mm thick — enough to feel substantial, thin enough not to affect wrist angle. — The Monk',
 '{"Size":"350×300mm","Surface":"Hard polymer","Thickness":"3mm","Base":"Rubber","Glide":"Ultra-fast"}',
 ARRAY['gamer'],
 true, 180, false, false, false, 12),

(13, 'sambar',
 'Sambar', 'mounts', '📐',
 15700, null, 'Hot', 'hot',
 3.9, 0,
 'Gas spring sit-stand. 20kg capacity. Switches without effort.',
 'Gas spring means zero effort to change position. 20kg handles dual monitors. The Sambar moves only when it must.',
 'The sambar deer moves between the forest floor and the open plateau — spending long hours at each level before making the transition. It does not rush the change. The Sambar sit-stand converter works this way: present at desk height, present at standing height, transitioned without effort when the body asks for it. The gas spring mechanism means a single smooth gesture raises or lowers everything.',
 'I stood at a desk for the first time three years ago and immediately understood what I had been missing. The Sambar converter made the transition practical — I do not have to commit to a standing desk. I switch when I need to. The gas spring is smooth enough that the decision costs nothing. I make it four or five times a day. — The Monk',
 '{"Height_Range":"0–400mm","Capacity":"20kg","Width":"800mm","Platforms":"Dual","Mechanism":"Gas spring"}',
 ARRAY['builder','creator'],
 true, 25, false, false, false, 13),

(14, 'pangolin',
 'Pangolin', 'accessories', '⬛',
 2700, null, null, '',
 3.9, 0,
 'Memory foam. Carbon weave. Keeps wrists neutral for all-day practice.',
 'Memory foam with carbon weave keeps wrists in a neutral position. Eight hours of practice without the fatigue. The Pangolin protects quietly.',
 'The pangolin is the only mammal covered entirely in scales — a quiet, private creature that carries its protection with it. It does not draw attention to its armour. The Pangolin wrist rest follows this principle: present without announcing itself, protective without interfering, maintaining the wrist in a neutral position through long sessions without the user noticing it is there.',
 'I spent two years with wrist pain before I understood the cause: typing with the wrists elevated. The Pangolin solved it in a week. Memory foam that holds its shape, carbon weave that does not feel synthetic. After three months the foam has not compressed — it still sits at exactly the right height. — The Monk',
 '{"Size":"430×80mm","Fill":"Memory foam","Cover":"Carbon weave","Base":"Non-slip","Profile":"Low-profile"}',
 ARRAY['builder','creator'],
 true, 200, false, false, false, 14),

(15, 'watchful-grey',
 'Watchful Grey', 'mice', '🖱️',
 4100, 5700, 'Sale', 'sale',
 3.1, 0,
 'Wired optical. 6400 DPI. Entry point for the practice.',
 'Entry point for the clearing. Wired reliability at a price that leaves budget for everything else. The Watchful Grey asks you to start.',
 'The grey heron stands motionless at the water edge for hours, watching. It does not move until it must. When it does move, the movement is decisive. The Watchful Grey mouse has this quality: it is not the fastest or the lightest, but it is reliable, precise, and asks nothing more of you than a decision to begin. Every practice starts somewhere.',
 'This is the mouse I give to someone who is equipping their first serious desk. Not because it is the best — the Patient Owl is better in every measurable way — but because it is honest. It does its job. It proves the concept. And it leaves enough budget to get everything else right. — The Monk',
 '{"DPI":"400–6400","Buttons":"6","Cable":"1.8m braid","RGB":"16M","Weight":"95g"}',
 ARRAY['gamer'],
 false, 0, false, true, false, 15),

(16, 'terrapin-hub',
 'Terrapin Hub', 'accessories', '🔗',
 6600, null, 'New Drop', 'new',
 4.8, 0,
 '12 ports. 4K HDMI. 100W PD. One Companion replaces four adapters.',
 '12 ports through a single cable. The Long Path''s desk stops being a nest of adapters. The Terrapin Hub does the work without announcing it.',
 'The terrapin carries everything it needs. Its shell is not decoration — it is infrastructure. The Terrapin Hub follows this logic: 12 ports in a single compact unit, connecting to the laptop through a single USB-C cable. Four separate adapters replaced. The desk surface cleared. The infrastructure invisible.',
 'I used to travel with four adapters in a bag. HDMI. USB-A hub. Ethernet dongle. Card reader. The Terrapin Hub replaced all of them. One cable from the laptop. Everything connects. The 100W PD charges the laptop simultaneously. The gigabit ethernet is stable. I have used it daily for seven months without a failure. — The Monk',
 '{"Ports":"12","HDMI":"4K@60Hz","PD_Charging":"100W","USB_A":"4×USB 3.0","Ethernet":"Gigabit"}',
 ARRAY['builder','creator'],
 true, 90, true, false, false, 16);

-- ─────────────────────────────────────────────────────────────────
-- PATHS — The Three Paths
-- ─────────────────────────────────────────────────────────────────
insert into public.paths (slug, name, subtitle, archetype, archetype_emoji, description, stat_label_1, stat_value_1, stat_label_2, stat_value_2, stat_label_3, stat_value_3, stat_label_4, stat_value_4, product_ids, bundle_savings, sort_order) values

('quick',
 'The Quick Path', 'Setup of the Shrike',
 'Shrike', '🦅',
 'The Shrike moves first. These Companions are built for speed, precision, and endurance. Zero-latency response, clean sight lines — nothing that slows the practice.',
 'Components', '6', 'Response', '1ms', 'Max DPI', '26K', 'RGB', 'Full Sync',
 ARRAY[1, 2, 6, 4, 5, 9], 2900, 1),

('still',
 'The Still Path', 'Setup of the Owl',
 'Owl', '🦉',
 'The Owl holds its ground. Colour-accurate, acoustically honest, free of noise. Companions that hold their ground so the work can happen.',
 'Components', '6', 'Frequency', '10Hz–35kHz', 'Impedance', '250Ω', 'Ports', '12',
 ARRAY[3, 7, 1, 11, 5, 10], 2300, 2),

('long',
 'The Long Path', 'Setup of the Elephant',
 'Elephant', '🐘',
 'The Elephant goes the distance. Eight hours, twelve hours — endurance without compromise. Companions built for those who think in systems and never stop.',
 'Components', '6', 'Monitor Ready', 'Dual', 'Hub Ports', '12', 'Cable Chaos', 'Zero',
 ARRAY[2, 1, 5, 13, 16, 8], 3300, 3);

-- ─────────────────────────────────────────────────────────────────
-- JOURNAL POSTS — First six
-- ─────────────────────────────────────────────────────────────────
insert into public.journal_posts (slug, title, tag, excerpt, body, creature, read_time_min, issue_number, published_at) values

('great-hornbill-and-monitor-arms',
 'What the Great Hornbill taught me about monitor arms.',
 'Creature Study',
 'The Great Hornbill is one of the largest birds in the Indian forest canopy. It spends most of its life above the clutter. When it moves its head, it moves with absolute purpose.',
 'The Great Hornbill is one of the largest birds in the Indian forest canopy. It spends most of its life above the clutter. When it moves its head, it moves with absolute purpose — one slow rotation that takes in everything below without disturbing the branch.

A monitor arm should work exactly this way. Full motion available. Motion rarely used.

Most people who buy a monitor arm use it once to find the right height and angle, then never touch it again. This is not a failure of the product. It is the product working correctly. The arm is not for adjustment. It is for the possibility of adjustment — and for the surface area it returns to the desk.

The Great Hornbill monitor arm reclaims 40% of the desk surface on average. It removes the stand. It removes the riser. It removes the stack of books people use as risers. What remains is open surface and a monitor exactly where the neck wants it.

The Hornbill''s secret is the cable management channel. Not a zip-tie solution. A proper channel, cut into the arm, through which cables run invisibly from monitor to desk. The desk stays clean because the infrastructure is inside the arm.

Move it when you need to. Leave it still when you don''t. That is the Hornbill''s way.',
 '🦅 Great Hornbill', 4, 1, now()),

('why-keyboard-weighs-1180g',
 'Why the monk''s keyboard weighs 1,180g.',
 'The Practice',
 'Light keyboards flex. They shift under keystroke pressure. A gasket-mounted aluminium board at 1,180g stays in place the way a stone stays in place.',
 'Light keyboards flex. They shift under keystroke pressure. The plastic creaks. The feet slide.

A gasket-mounted aluminium board at 1,180g stays in place the way a stone stays in place.

The typing experience is not about the weight. It is about what the weight prevents.

A heavy keyboard does not move when you type on it. The gasket mounting means the board flexes slightly — absorbing impact rather than transmitting it — while the aluminium case means the flex is controlled and consistent. The result is a typing experience that feels intentional. Deliberate. Every keystroke lands where it should.

The Silent Viper weighs 980g. Not because weight is a goal. Because aluminium is the right material for the case, and the right amount of aluminium for this keyboard has this mass.

Specifications are descriptions of decisions. When you read that the Silent Viper uses a CNC-machined aluminium case, the weight is the consequence of that decision — not a selling point, not a liability. A fact.

The monk''s rule: never optimise for lightness in a tool that stays in one place. Optimise for stillness.',
 '🐍 Silent Viper', 3, 2, now() - interval '1 day'),

('building-the-still-path',
 'Building the Still Path: a deep-work setup.',
 'Setup Breakdown',
 'The Owl does not hunt by searching. It waits until the target reveals itself, then moves once with precision. The Still Path is built around this principle.',
 'The Owl does not hunt by searching. It waits until the target reveals itself, then moves once with precision.

The Still Path is built around this principle — a desk designed to reduce the number of decisions until only the work remains.

**The Companions in sequence:**

The Lone Gibbon headphones first. Before you touch anything else on the desk, put on the headphones. Open-back means you are still in the room — but the room is quieter. 250Ω impedance means you need the Dhole to drive them properly. Together they create an acoustic clearing inside the physical one.

The Great Hornbill arm holds two monitors at exact eye height. No neck bend. The monitors become transparent — windows rather than objects on a desk.

The Still Krait bias light goes behind the monitor. Not decorative. The CRI >90 white channel reduces the contrast between screen and wall. After a week you stop noticing it. You notice only that your eyes are less tired.

The Langur deskpad covers everything. Mouse, keyboard, notebook — all on the same surface. Consistent friction everywhere. Nothing moves unless you move it.

The Firefly lights the desk. The diffuser means no direct glare. The app means you can set it and forget it.

The result is a desk that holds its ground. That is the Still Path.',
 '🦉 The Owl', 6, 3, now() - interval '2 days'),

('silent-forest-4am',
 'The field recording of a silent forest at 4am.',
 'Field Recording',
 'There is a sound a forest makes at 4am that it makes at no other time. Not silence — something denser than silence.',
 'There is a sound a forest makes at 4am that it makes at no other time.

Not silence. Silence is the absence of sound. This is something denser than silence — the presence of quiet. A condition rather than a void.

The monk recorded it in a clearing in the Nilgiris. Single microphone, mid-side configuration, positioned at ear height. The recording runs for forty-seven minutes without edits.

What you hear: occasional wind in the upper canopy. The distant sound of water over stone, too far away to identify. A nightjar calling once, then not again. A shift in the ambient texture at approximately 4:23am that is difficult to describe — as though the forest changed gears.

What you do not hear: human construction. Traffic. Air conditioning. The particular texture of electronics left running.

This is the sound the Hud is trying to replicate at your desk. Not the absence of noise. The presence of quiet. A desk where every Companion does its work without announcing it. Where the cables are invisible. Where the light is on the surface and not in your face. Where the tools have earned their place and ask nothing more of you than to work.

Play it while you build.',
 '🌿 The Clearing', 2, 4, now() - interval '3 days'),

('how-to-strip-a-desk',
 'How to strip a desk — and what to put back.',
 'The Practice',
 'Remove everything from your desk. Everything — not most things. Put it on the floor. Now sit at the empty surface for ten minutes and notice what you reach for.',
 'Remove everything from your desk. Everything — not most things. Put it on the floor.

Now sit at the empty surface for ten minutes and notice what you reach for.

What you reach for first is what belongs back. Everything else needs to earn its return. Most things do not make it. That is exactly right.

**The monk''s process:**

Sit for ten minutes with nothing on the desk. Notice what feels missing. Reach for things that are not there. Make a list.

Return only what you reached for. Set a rule: nothing returns to the desk without being used within 24 hours of its return. Things that sit unused for a day do not belong on the desk.

Wait a week. Then do it again. The second time is easier.

**What usually stays:**

The input devices. The monitor. A single notebook and pen. Water. The lamp. That is often everything.

**What usually does not make it back:**

Decorative objects. Chargers for devices not in daily use. Pens that are not used. Cables for things that could be wireless. The small tray where things accumulate.

The desk that remains is the desk that serves you. Not the desk that represents you.',
 '🍃 Desk Doctrine', 5, 5, now() - interval '4 days'),

('the-order-first-100-monks',
 'The Order: first 100 monks.',
 'The Order',
 'The first hundred people who join the Order before the first Companion ships will shape what comes next. They will test Companions before they are announced.',
 'The first hundred people who join the Order before the first Companion ships will shape what comes next.

They will test Companions before they are announced. They will tell the Monk what is missing from the clearing. They will receive things that are not yet available to anyone else.

**What membership means:**

Early access to every new Companion before it opens to the public. Direct signal to the Monk on what gets built next — not through a survey, through a conversation. Occasional physical things that are not products: field notes, reference cards, small tools for the practice.

**What it does not mean:**

A community forum. A Discord server with hundreds of channels. A newsletter that arrives three times a week. The Order is not a content subscription. It is a relationship between people who take their desks seriously.

**How to join:**

Leave your email in the clearing. That is all. When the first Companion ships, members of the Order are notified first. From that point, the relationship develops.

The Monk does not build alone. The Order decides what gets built next.',
 '🏔️ The Order', 3, 6, now() - interval '5 days');
