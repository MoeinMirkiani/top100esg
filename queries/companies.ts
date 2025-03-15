export const CompaniesQuery = `
query Companies {
  companies {
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
