# Feature: Document Upload & Data Extraction

1. Upload PDF files containing technical documents

2. The system processes the document and automatically extracts structured data

3. The user can review and edit the extracted data

4. The data is saved and used in downstream product workflows

Assume that: </br>

-   The application has a web frontend
-   There is an API responsible for processing
-   Processing may take several seconds
-   Extraction failures may occur

Additional features: <br>
-   User can retry the upload if extraction fail
-   PDF cannot be empty
-   Application cannot accept different files format
-   PDF cannot be bigger than 50MBs
-   Loading modal to extract/upload data
-   User can upload more than 1 PDF (FIF0)
-   Upload file mantain even after a web refresh
-   Upload can be canceled by user

## Test Scope

### ✅ In Scope
- **File Upload Validation**
  - PDF format validation
  - File size validation (≤ 50MB)
  - Empty file validation
  - Multiple file uploads (FIFO order)
  
- **Data Extraction**
  - Success scenarios
  - Failure scenarios with retry mechanism
  - Data accuracy verification
  
- **User Interface**
  - Review and edit functionality for extracted data
  - Loading modal display during processing
  - Upload cancellation feature
  - Data persistence after page refresh
  
- **Integration**
  - Downstream workflow integration
  - End-to-end data flow verification
  
- **Exception Handling**
  - Extraction failures
  - Invalid file formats
  - File size violations
  - User feedback mechanisms

### ❌ Out of Scope
- Performance testing of downstream workflows
- Load testing of the processing API
- Security penetration testing
- Browser compatibility testing

## Types of testing

1.  **API Testing**: Verify API endpoints for upload and processing
2.  **Integration Testing**: Test end-to-end with downstream workflows
3.  **Functional Testing**: Validate user interface components and interactions
4.  **Edge Scenarios**: Verify errors handlings and validation rules
## Test Scenarios 

### Test case 1 : Sucess Upload PDF file and Data Extraction
1.  Navigate to web application
2.  Select and upload a valid PDF file 
3.  Wait for processing to complete 
**Expected result:**
    -   Loading modal displays during processing
    -   Extracted data is displayed for review
    -   User can proceed to edit data


### Test case 2 : Invalid file format upload
1.  Navigate to web application
2.  Atempt to upload a .txt or .xlsx file 
**Expected result:**
    -   Upload rejected
    -   Message error displayed: "Only PDF Files are accepted"
    -   No processing is initiated

### Test case 3 : Empty PDF file upload 
1.  Navigate to web application
2.  Attempt to upload a empty PDF file </br>
**Expected result:**
    -   Upload rejected
    -   Message error displayed: "Cannot upload empty file"
    -   No processing is initiated

### Test case 4 : Edit extracted data 
1.  Navigate to web application 
2.  Upload valid PDF file 
3.  Wait for file extraction to complete
4.  Modify extracted data
5.  Save changes </br>
**Expected result:**
    -   Changes are saved sucessfully
    -   Updated data reflects in the interface
    -   Modified data persists after page refresh

### Test case 5 : Data Flow to Downstream Workflows
1.  Navigate to web application 
2.  Upload and process PDF file
3.  Review and save extracted data
4.  Navigate to downstream workflow </br>
**Expected result:**
    -   Upload rejected
    -   Message error displayed: "Cannot upload empty file"
    -   No processing is initiated

### Test case 6 : Extraction failure and Retry
1.  Navigate to web application 
2.  Attempt to upload PDF file 
3.  Observe extraction failure
4.  Click retry button
**Expected result:**
    -   Error message displayed: "Extraction failed"
    -   Retry option is available
    -   On retry, new extraction attempt is initiated

### Test case 7 : File exceeds size limit 
1.  Navigate to web application 
2.  Attempt to upload PDF file with 52MBs </br>
**Expected result:**
    -   Upload rejected
    -   Error message "File exceeds 50 MB limit"
    -   No processing initiated

### Test case 8 : Maximum file size
1.  Navigate to web application 
2.  Attempt to upload PDF file with 50 Mbs </br>
**Expected result:**
    -   Upload accepted
    -   Loading modal displays during processing
    -   Successful data extraction 

### Test case 9 : Multiple PDF Files upload (FIFO order) 
1.  Navigate to web application 
2.  Select multiple PDF files</br>
**Expected result:**
    -   Files are queued and processed in FIFO
    -   Loading modal shows progress for each file
    -   Each file's data is extracted sequentially

### Test case 10 : Cancel upload during process
1.  Navigate to web application </br>
2.  Start upload of PDF file</br>
3.  Click "Cancel" button during upload/processing </br>
**Expected result:**
    -   Upload is immediately cancelled
    -   Loading modal closes
    -   No data is extracted

### Test case 11 : Incorrect file in multiple upload</br>
1.  Navigate to web application </br>
2.  Attempt to upload PDF and an invalid file format</br>
**Expected result:**
    -   Valid PDF is processed successfully
    -   Invalid file is rejected with error message
    -   Valid process is unaffected
    -   Clear feedback for each file


##  Test Enviroment Requirements
-   Web Browser
-   Test PDF Files(multiple sizes: empty, 1MB,49MB,50MB and 52MB)
-   Invalid format files
-   API Testing tool (Postman)

##  Entry Criteria
-   Test enviroment is set up and accessible
-   Test data files are prepared
-   API endpoints are available
-   Frontend application is deployed


## Defect Priority Classification 
**Critical:**   System unusable, data loss, security issues, upload fails for all kind of files </br>
**High:** Extraction fails consistently, edit not working, major feature problems </br>
**Medium:** Features partially broken, workaround exists, UI glitches, unclear error messages </br>
**Low:**    minor issues, cosmetic problems

## Manual vs Automated 

**Progressive Testing:** Manual </br>
**Regression Testing:**  Automated </br>
**Visual/UI exploration:** Manual </br>
**API Tests:** Automated
