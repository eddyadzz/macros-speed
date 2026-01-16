import { Instagram, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface InstagramPost {
  id: string;
  instagram_id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string | null;
  permalink: string;
  caption: string | null;
  timestamp: string;
}

export function SocialFeed() {
  const instagramUsername = 'macros.speed';
  const facebookPageUrl = 'https://www.facebook.com/macros.speed';
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  async function fetchInstagramPosts() {
    try {
      const { data, error } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(6);

      if (error) throw error;
      if (data) {
        setInstagramPosts(data);
      }
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
    } finally {
      setLoading(false);
    }
  }

  const latestPost = instagramPosts[0];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest transfers, beautiful destinations, and happy customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Instagram</h3>
                <p className="text-gray-600">@{instagramUsername}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Follow us on Instagram for stunning photos of the Maldives, behind-the-scenes moments, and daily updates from our speedboat adventures.
              </p>

              {loading ? (
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden relative animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
              ) : latestPost ? (
                <a
                  href={latestPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square rounded-xl overflow-hidden relative group"
                >
                  <img
                    src={latestPost.media_type === 'VIDEO' && latestPost.thumbnail_url ? latestPost.thumbnail_url : latestPost.media_url}
                    alt={latestPost.caption || 'Instagram post'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm line-clamp-2">
                        {latestPost.caption || 'View on Instagram'}
                      </p>
                    </div>
                  </div>
                  {latestPost.media_type === 'VIDEO' && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </a>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <Instagram className="w-16 h-16 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-gray-700 font-medium mb-4">
                      Connect with us on Instagram
                    </p>
                  </div>
                </div>
              )}

              <a
                href={`https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow on Instagram</span>
              </a>

              {instagramPosts.length > 1 && (
                <div className="grid grid-cols-5 gap-2 pt-2">
                  {instagramPosts.slice(1, 6).map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square rounded-lg overflow-hidden relative group"
                    >
                      <img
                        src={post.media_type === 'VIDEO' && post.thumbnail_url ? post.thumbnail_url : post.media_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {post.media_type === 'VIDEO' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
          </div>

          <div className=" bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Facebook</h3>
                <p className="text-gray-600">macros.speed</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Like our Facebook page for the latest news, special offers, customer reviews, and travel tips for your Maldives journey.
              </p>

              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <img src="/images/facebook-cover.jpg" alt="Facebook"/>
                  <Facebook className="w-16 h-16 text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-gray-700 font-medium mb-4">
                    Join our Facebook community
                  </p>
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Like on Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-4 bg-blue-50 rounded-xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center border-2 border-white">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white">
                <Facebook className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-gray-700 font-medium">
              Join <span className="text-blue-600 font-bold"></span> travelers following our journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
