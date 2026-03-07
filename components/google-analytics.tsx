import Script from 'next/script'

export default function GoogleAnalytics() {
  // Get GA ID from environment variable - not set by default to prevent tracking template usage
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Only load GA if ID is configured
  if (!gaId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
