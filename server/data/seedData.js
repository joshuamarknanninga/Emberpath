const knowledgeEntries = [
  {
    title: 'Rain Catchment With Clean Vessel Rotation',
    summary: 'Collect rainwater with layered collection and clean-container staging.',
    content:
      'Use a clean tarp or broad leaf above runoff channels, direct first flush away, then collect in sanitized vessel. Rotate containers every 12 hours and label collection times.',
    difficulty: 'easy',
    timeRequired: '20-40 minutes setup',
    tools: ['tarp or poncho', 'cordage', 'clean container'],
    tags: ['water', 'rain', 'sanitation'],
    region: 'temperate',
    safetyNotes: ['Avoid runoff from painted or chemically treated surfaces.', 'Boil or filter before drinking when possible.'],
    source: {
      type: 'public-domain',
      provenance: 'General fieldcraft methods',
      citation: 'Community preparedness notes',
      caution: 'Not guaranteed potable without treatment.'
    }
  },
  {
    title: 'Solar Disinfection (SODIS) in Clear Bottles',
    summary: 'Low-tech water risk reduction using sunlight and clear PET bottles.',
    content: 'Fill clear bottles, shake to oxygenate, expose in direct sunlight for at least 6 hours in strong sun or 2 days in cloudy conditions.',
    difficulty: 'easy',
    timeRequired: '6+ hours',
    tools: ['clear PET bottle'],
    tags: ['water', 'sun', 'disinfection'],
    region: 'arid',
    safetyNotes: ['Water must be relatively clear before SODIS.', 'Use as risk reduction, not absolute sterilization.'],
    source: { type: 'historical', provenance: 'Public health emergency practice', citation: 'Disaster hygiene references', caution: 'Ineffective for chemical contaminants.' }
  },
  {
    title: 'Three-Layer Debris Shelter',
    summary: 'Build wind-resistant insulation shelter with frame and debris layering.',
    content: 'Create a ridgepole frame, weave smaller branches, layer with dry debris to elbow-thickness, keep opening minimal and downwind.',
    difficulty: 'moderate',
    timeRequired: '1-2 hours',
    tools: ['branch saw optional', 'cordage optional'],
    tags: ['shelter', 'cold', 'wind'],
    region: 'forest',
    safetyNotes: ['Avoid dead hanging branches overhead.', 'Monitor for hypothermia signs continuously.'],
    source: { type: 'field', provenance: 'Woodscraft common method', citation: 'Field-tested patterns', caution: 'Requires dry insulating material.' }
  },
  {
    title: 'Signal Triangle Ground Marker',
    summary: 'Use high-contrast triangle marker for aerial detection.',
    content: 'Place three high-contrast markers in a large triangle in open terrain. Keep spacing visible from altitude and clear shadow obstructions.',
    difficulty: 'easy',
    timeRequired: '15-30 minutes',
    tools: ['bright cloth', 'stones or logs'],
    tags: ['signal', 'rescue', 'navigation'],
    region: 'general',
    safetyNotes: ['Stay near marker but preserve shelter access.', 'Avoid exposure while constructing in severe weather.'],
    source: { type: 'public-domain', provenance: 'Emergency signaling conventions', citation: 'Search-and-rescue guidance', caution: 'Visibility depends on terrain and weather.' }
  },
  {
    title: 'Cold Weather Layering Check Cycle',
    summary: 'Prevent sweat chill with timed layer adjustment routine.',
    content: 'Apply base-insulate-shell layers; every 20 minutes reassess moisture, wind, and extremity warmth. Vent before overheating, insulate during rest.',
    difficulty: 'easy',
    timeRequired: 'continuous',
    tools: ['layered clothing'],
    tags: ['cold', 'clothing', 'hypothermia'],
    region: 'mountain',
    safetyNotes: ['Wet clothing in freezing conditions is high risk.', 'Check partner cognition and dexterity regularly.'],
    source: { type: 'historical', provenance: 'Expedition travel practice', citation: 'Open preparedness training', caution: 'Not substitute for medical care.' }
  },
  {
    title: 'Field Boil-and-Hold Water Treatment',
    summary: 'Bring water to rolling boil then hold appropriately for elevation.',
    content: 'Filter particulates first. Boil at rolling state for 1 minute at lower elevations, 3 minutes at high elevations where boiling point drops.',
    difficulty: 'easy',
    timeRequired: '15-25 minutes',
    tools: ['pot', 'heat source', 'cloth prefilter'],
    tags: ['water', 'boil', 'sanitation'],
    region: 'general',
    safetyNotes: ['Handle heated containers carefully to avoid burns.', 'Cool covered to reduce recontamination.'],
    source: { type: 'public-domain', provenance: 'Emergency water guidance', citation: 'Preparedness agencies', caution: 'Does not remove heavy metals or fuels.' }
  },
  {
    title: 'Improvised Splint Stabilization',
    summary: 'Immobilize suspected limb fracture using padding and rigid supports.',
    content: 'Support injury in found position, pad bony points, secure rigid supports above and below injury, check circulation before and after.',
    difficulty: 'moderate',
    timeRequired: '10-20 minutes',
    tools: ['cloth', 'sticks or rigid objects', 'bandage'],
    tags: ['medical', 'injury', 'stabilization'],
    region: 'general',
    safetyNotes: ['Do not force realignment in field.', 'Seek urgent professional care.'],
    source: { type: 'public-domain', provenance: 'Basic first response principles', citation: 'Open first aid references', caution: 'Emergency bridge only.' }
  },
  {
    title: 'Low-Smoke Cooking Trench',
    summary: 'Create narrow trench fire to reduce flame profile and smoke drift.',
    content: 'Dig a shallow trench aligned with wind, maintain small dry fuel pieces, keep combustion hot and controlled.',
    difficulty: 'moderate',
    timeRequired: '25-45 minutes',
    tools: ['digging tool', 'dry tinder', 'kindling'],
    tags: ['fire', 'cooking', 'concealment'],
    region: 'general',
    safetyNotes: ['Verify local fire regulations and restrictions.', 'Extinguish fully and restore site.'],
    source: { type: 'historical', provenance: 'Historical expedition technique', citation: 'Open historical records', caution: 'Not for extreme drought/fire bans.' }
  },
  {
    title: 'River Crossing Risk Scan',
    summary: 'Assess current, depth, and exit paths before crossing moving water.',
    content: 'Scout upstream/downstream hazards, test depth with pole, unbuckle pack waist strap, cross at widest safe section with diagonal stance.',
    difficulty: 'advanced',
    timeRequired: '15-30 minutes',
    tools: ['sturdy pole'],
    tags: ['water', 'movement', 'risk'],
    region: 'mountain',
    safetyNotes: ['Do not cross flood-stage water.', 'Cold shock and foot entrapment can be fatal.'],
    source: { type: 'field', provenance: 'Backcountry travel practices', citation: 'Public safety advisories', caution: 'Abort if uncertain.' }
  },
  {
    title: 'Coastal Fog Direction Method',
    summary: 'Use wind, surf, and sun cues for orientation in low visibility.',
    content: 'Map dominant surf direction, check wind on skin, and use intermittent sun breaks to hold consistent bearing.',
    difficulty: 'moderate',
    timeRequired: '10 minutes + travel',
    tools: ['notebook optional'],
    tags: ['navigation', 'coastal', 'weather'],
    region: 'coastal',
    safetyNotes: ['Track tide windows to avoid route cutoff.', 'Use conservative movement near cliffs.'],
    source: { type: 'community', provenance: 'Coastal walker practices', citation: 'Open local preparedness circles', caution: 'Visibility shifts rapidly.' }
  },
  {
    title: 'Respectful Plant Knowledge Logging',
    summary: 'Record practical plant observations with provenance and caution metadata.',
    content: 'Document plant trait, location, season, mentor/source, and caution tags. Do not harvest culturally protected or uncertain species.',
    difficulty: 'easy',
    timeRequired: 'ongoing',
    tools: ['journal', 'camera optional'],
    tags: ['plants', 'documentation', 'ethics'],
    region: 'general',
    safetyNotes: ['Never ingest unknown plants.', 'Respect local stewardship and restrictions.'],
    source: {
      type: 'indigenous-context',
      provenance: 'Shared non-sacred stewardship practices',
      citation: 'Community-approved learning guidance',
      caution: 'Do not document sacred or restricted practices.'
    }
  },
  {
    title: 'Urban Blackout Mutual Aid Check-In',
    summary: 'Coordinate block-level status checks during power outage.',
    content: 'Use pre-agreed check windows, identify vulnerable neighbors, assign water and medicine runners, maintain written status board.',
    difficulty: 'easy',
    timeRequired: '30 minutes initial',
    tools: ['paper board', 'flashlights', 'whistle'],
    tags: ['urban', 'community', 'coordination'],
    region: 'urban',
    safetyNotes: ['Avoid entering unsafe structures.', 'Use buddy system at night.'],
    source: { type: 'community', provenance: 'Neighborhood resilience groups', citation: 'Open mutual aid templates', caution: 'Adjust for local emergency policy.' }
  }
];

const mapReports = [
  { type: 'resource', title: 'Spring Outlet', description: 'Seasonal spring, best flow after rain.', lat: 47.614, lng: -122.33 },
  { type: 'hazard', title: 'Landslide Edge', description: 'Unstable slope near logging road.', lat: 47.602, lng: -122.28 },
  { type: 'meetup', title: 'Community Checkpoint', description: 'Open lot used for radio check-ins.', lat: 47.625, lng: -122.31 },
  { type: 'resource', title: 'Public Pump Station', description: 'Manual pump accessible with wrench.', lat: 47.63, lng: -122.34 },
  { type: 'hazard', title: 'Flooded Underpass', description: 'Unsafe after heavy rain.', lat: 47.61, lng: -122.29 },
  { type: 'meetup', title: 'Trailhead Bulletin Board', description: 'Volunteer updates and route notes.', lat: 47.59, lng: -122.32 }
];

const socialPosts = [
  { content: 'Tested our blackout neighbor check-in sheet tonight. Worked well with two households.', tags: ['community', 'urban'] },
  { content: 'Reminder: rotate water containers every 48 hours when practicing drills.', tags: ['water'] },
  { content: 'Anyone running low-smoke cooking trench practice this weekend?', tags: ['fire', 'practice'] },
  { content: 'Fog on the coast today made compass checks extra valuable.', tags: ['navigation', 'coastal'] },
  { content: 'Added two new resource points to the map after trail cleanup.', tags: ['map', 'resource'] },
  { content: 'Layer check cycle prevented sweat chill during early hike.', tags: ['cold', 'gear'] }
];

module.exports = { knowledgeEntries, mapReports, socialPosts };
