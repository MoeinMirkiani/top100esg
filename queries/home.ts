export const HomeQuery = `
query Home($id: ID = "268") {
  page(id: $id, idType: DATABASE_ID) {
    homeAcf {
      home {
        language
        pageContent {
          title
          description
          metrics {
            title
            metricsItems {
              metric
              description
            }
          }
          bannerTitle
          bannerDescription
          reportTitle
          reportDescription
          team {
            title
            description
            members {
              fullName
              affiliation
            }
          }
        }
      }
    }
  }
}
`
