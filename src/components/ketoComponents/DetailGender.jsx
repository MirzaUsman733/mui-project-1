import { Container } from '@mui/material'
import React from 'react'

export default function DetailGender() {
  return (
    <>
     <h3 className="mb-3">
                How do I use your calculator to get my macros?
              </h3>
              <Container
                className="mb-4 p-3"
                style={{ backgroundColor: '#d6d5c9', borderRadius: '10px' }}
              >
                <p>
                  While inputting your information, you may find that some of
                  the sections and terms are confusing. If this is the case for
                  you, simply click the lower case “i” logo located near the
                  title of each section of our keto calculator. After you click
                  the lower case “i” logo, you will be directed to a brief
                  explanation that should answer your questions.
                </p>
                <p>
                  If you are still unsure of how to use the keto calculator or
                  if you think you aren’t getting the right keto macro numbers,
                  read through the other Q&As and comments below, you will
                  probably find the answer there.
                </p>
                <p>
                  If you still don’t find the answer, please submit a comment
                  with the question and we will address it as soon as possible.
                </p> 
                </Container>
                <hr />
    </>
  )
}
