export const MethodologyQuery = `
query Methodology($id: ID = "228") {
  page(id: $id, idType: DATABASE_ID) {
    title
    methodologyAcf {
      methodology {
        language
        content
      }
    }
  }
}
`
