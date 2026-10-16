/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The CV links to /resume, and a CV tailored to one company to
      // /resume/<company>, so Google Analytics can tell those visits from
      // direct ones. Temporary, so browsers don't cache them and the tags can
      // change.
      {
        source: "/resume",
        destination: "/?utm_source=cv&utm_medium=resume",
        permanent: false,
      },
      {
        source: "/resume/:campaign",
        destination: "/?utm_source=cv&utm_medium=resume&utm_campaign=:campaign",
        permanent: false,
      },
      // The resume's old file name, for links shared before the rename.
      {
        source: "/Resume.pdf",
        destination: "/BHONE%20AUNG%20KYAW%20-%20Resume.pdf",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
