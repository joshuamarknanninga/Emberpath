import { MessageCircleMore, SendHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function CommunityPage() {
  const [feed, setFeed] = useState({ posts: [], comments: [] });
  const [draft, setDraft] = useState('');

  useEffect(() => {
    request('/api/social/feed').then(setFeed);
  }, []);

  const groupedComments = useMemo(() => {
    const map = {};
    feed.comments.forEach((comment) => {
      map[comment.post] = map[comment.post] || [];
      map[comment.post].push(comment);
    });
    return map;
  }, [feed.comments]);

  return (
    <PageShell title="Community Feed" subtitle="Practical updates, short field reports, and resilient coordination." meta="Social">
      <div className="card p-5">
        <p className="mb-2 text-sm text-slate-300">New post</p>
        <div className="flex gap-2">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Share a concise field update..." className="flex-1 rounded-xl border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-sm outline-none" />
          <button className="rounded-xl bg-slate-100 px-3 py-2 text-slate-900"><SendHorizontal className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="space-y-4">
        {feed.posts.map((post) => (
          <article key={post._id} className="card p-5">
            <p className="mb-2 text-xs text-slate-400">{post.user?.name || 'Member'}</p>
            <p className="text-slate-100">{post.content}</p>
            <div className="mt-2 flex gap-2 text-xs text-slate-400">{post.tags?.map((t) => <span key={t}>#{t}</span>)}</div>
            <div className="mt-4 rounded-xl border border-slate-700/45 bg-slate-900/40 p-3 text-sm text-slate-300">
              <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400"><MessageCircleMore className="h-3.5 w-3.5" />Comments</p>
              {(groupedComments[post._id] || []).length ? (
                (groupedComments[post._id] || []).map((c) => <p key={c._id}>• {c.content}</p>)
              ) : (
                <p className="text-xs text-slate-500">No comments yet.</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
