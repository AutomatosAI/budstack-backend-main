export const CREATE_CASE_FOR_INDIVIDUALS = `mutation ($input: CreateCaseForIndividualsInput!) {
  createCaseForIndividuals(input: $input) {
    ... on CaseInformation {
      caseId
      reference
      caseStatus
      caseType
      name
      timeReceived
      individuals {
        individualId
        legalName {
          firstName
          middleName
          lastName
          fullName
        }
        preferredName {
          firstName
          middleName
          lastName
          fullName
        }
        emailAddress
        phoneNumber
        requiresCDD
        address {
          address1
          address2
          city
          region
          postCode
          country {
            CCA2
          }
        }
        citizenship {
          CCA2
        }
        dateOfBirth
        isCaseContact
        notes
        urls {
					verification {
						... on ValidUrl {
							url
						}
						... on InvalidUrl {
							message
						}
					}
					view
				}      
      }
    }
    ... on ValidationErrors {
      errors {
        message
        fieldPath
        __typename
      }
    }
  }
}`;
