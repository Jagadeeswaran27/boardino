const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            See what our customers have to say about how Boardino has
            transformed their workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-neutral-700 mb-6">
              &quot;Boardino has completely transformed how our development team
              manages projects. The intuitive interface and powerful features
              have increased our productivity by 30%.&quot;
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-neutral-700">CTO, TechNova</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-neutral-700 mb-6">
              &quot;The analytics feature in Boardino gives us incredible
              insights into our team&apos;s performance. We&apos;re now able to
              identify bottlenecks before they become problems.&quot;
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Michael Chen</h4>
                <p className="text-sm text-neutral-700">
                  Product Manager, InnovateCorp
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-neutral-50 p-8 rounded-xl border border-neutral-200">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-neutral-700 mb-6">
              &quot;We switched from three different tools to just Boardino, and
              it has streamlined our entire workflow. The customer support team
              has been incredibly helpful throughout.&quot;
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Emily Rodriguez</h4>
                <p className="text-sm text-neutral-700">
                  Marketing Director, GrowthWave
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
