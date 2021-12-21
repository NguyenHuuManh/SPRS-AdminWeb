import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" rel="noopener noreferrer">SPRS</a>
        <span className="ml-1">&copy; 2021 K13 FPTU</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
