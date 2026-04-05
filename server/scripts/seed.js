require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDb = require('../config/db');
const User = require('../models/User');
const Badge = require('../models/Badge');
const KnowledgeEntry = require('../models/KnowledgeEntry');
const KnowledgeRelation = require('../models/KnowledgeRelation');
const MapReport = require('../models/MapReport');
const SocialPost = require('../models/SocialPost');
const { knowledgeEntries, mapReports, socialPosts } = require('../data/seedData');

const run = async () => {
  await connectDb();

  await Promise.all([
    User.deleteMany({}),
    Badge.deleteMany({}),
    KnowledgeEntry.deleteMany({}),
    KnowledgeRelation.deleteMany({}),
    MapReport.deleteMany({}),
    SocialPost.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('emberpath123', 10);
  const demoUser = await User.create({
    name: 'Demo Pathfinder',
    email: 'demo@emberpath.app',
    passwordHash,
    points: 80
  });

  const badges = await Badge.insertMany([
    { key: 'first-report', title: 'Trail Reporter', description: 'Submitted your first map report', pointsAwarded: 15 },
    { key: 'knowledge-keeper', title: 'Knowledge Keeper', description: 'Saved ten knowledge entries', pointsAwarded: 25 },
    { key: 'community-voice', title: 'Community Voice', description: 'Published five useful posts', pointsAwarded: 20 }
  ]);

  demoUser.badges = badges.map((b) => b._id);
  await demoUser.save();

  const entries = await KnowledgeEntry.insertMany(knowledgeEntries);

  const relations = [];
  for (let i = 0; i < entries.length; i += 1) {
    const current = entries[i];
    const candidates = entries.filter((e) => e._id.toString() !== current._id.toString() && e.tags.some((t) => current.tags.includes(t))).slice(0, 2);
    current.relatedEntries = candidates.map((c) => c._id);
    await current.save();
    candidates.forEach((c) => {
      relations.push({ fromEntry: current._id, toEntry: c._id, strength: 0.65, reason: 'shared tags' });
    });
  }

  await KnowledgeRelation.insertMany(relations);
  await MapReport.insertMany(mapReports.map((r) => ({ ...r, user: demoUser._id, verified: true })));
  await SocialPost.insertMany(socialPosts.map((p) => ({ ...p, user: demoUser._id })));

  console.log('Seed complete');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
