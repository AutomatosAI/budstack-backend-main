export const GET_CASE_INFO_OF_INDIVIDUALS = `query caseDetails($caseId: String!) {
  caseDetails(caseId: $caseId) {
    ... on CaseInformation {
      caseId
      reference
      caseStatus
      caseType
      name
      timeReceived
      notes
      caseDetails {
        caseRequestor {
          fullName
          emailAddress
        }
        caseLead {
          fullName
          emailAddress
        }
      }
      organization {
        organizationId
        name
        offices {
          key
          name
        }
      }
      office {
        key
        name
      }
      amlProfile {
        capturedActivity
        cddLevel
        riskAssessment
        transactionValue
        purpose
      }
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
        individualVerificationChecksStatus {
					address
					legalName
					dateOfBirth
					pep
					overall
				}
        documents {
          type
          country {
            CCA2
          }
          regionalVariant
          countryOfIssue {
            CCA2
          }
          files {
            fileType
            documentId
            fileExtension
            fileTitle
            contentsUrl
          }
          number
          expiryDate
          versionNumber
          gender
          __typename
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
