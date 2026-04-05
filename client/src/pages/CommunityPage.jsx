import { useEffect, useMemo, useState } from 'react';
import PageShell from '../components/PageShell';
import { request } from '../utils/api';

export default function CommunityPage() {
  const [feed, setFeed] = useState({ posts: [], comments: [] });

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
    <PageShell title="Community Feed" subtitle="Share practical notes, discuss methods, keep updates lightweight.">
      <div className="space-y-4">
        {feed.posts.map((post) => (
          <article key={post._id} className="card">
            <p className="mb-2 text-xs text-slate-400">{post.user?.name || 'Member'}</p>
            <p>{post.content}</p>
            <div className="mt-2 flex gap-2 text-xs text-slate-400">{post.tags?.map((t) => <span key={t}>#{t}</span>)}</div>
            <div className="mt-3 border-t border-slate-800 pt-2 text-sm text-slate-300">
              {(groupedComments[post._id] || []).map((c) => (
                <p key={c._id}>• {c.content}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
