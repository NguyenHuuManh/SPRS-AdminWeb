import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable, CPagination, CRow
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import usersData from "./UsersData";


const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = ({ history }) => {
  const [pageSize, setPageSize] = useState({ page: 1, size: 5 });
  const [data, setData] = useState([]);
  const callAPI = () => {
    setData(usersData.splice(pageSize.page, pageSize.size * pageSize.page));
  };

  const pageChange = (newPage) => {
    setPageSize({ ...pageSize, page: newPage });
  };

  useEffect(() => {
    callAPI();
  }, [pageSize]);



  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={data}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "registered",
                "role",
                "status",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={pageSize.page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={pageSize.page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
