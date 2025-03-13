export const CompaniesQuery = `
query Companies {
  companies {
    nodes {
      title
      id
      companyAcf {
        fiscalYearEnd
        headquartersLocation
        rankings {
          year
          consolidatedFinancialStatements
          sustainabilityReport
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
