export const CompaniesQuery = `
query Companies($first: Int!, $after: String!) {
  companies(first: $first, after: $after) {
    nodes {
      title
      id
      companyAcf {
        headquartersLocation
        rankings {
          year
          consolidatedFinancialStatements
          sustainabilityReport
          fiscalYearEnd
          sectionsVariables {
            section
            variable
            value
            rank
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
