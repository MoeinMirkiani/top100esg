export const CompaniesQuery = `
query Companies($first: Int!, $after: String!) {
  companies(first: $first, after: $after, where: {orderby: {field: TITLE, order: ASC}}) {
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
