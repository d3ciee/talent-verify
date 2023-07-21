import {
  Avatar,
  Badge,
  Button,
  Card,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  Header,
  Icon,
  Layout,
  NavGroup,
  NavItem,
  Navigation,
  Tab,
  TabGroup,
  TabPanel,
  Table,
  Tooltip,
} from "@nordhealth/react";
import { authContext } from "../../App";
import { useContext } from "react";

export function Dashboard() {
  return (
    <Layout sticky padding="none">
      <Sidebar />

      <Header slot="header">
        <h1 className="n-typescale-l">Dashboard</h1>
      </Header>
      <div
        style={{
          padding: 16,
        }}
      >
        <EmployeesView />
      </div>
    </Layout>
  );
}

function EmployeesView() {
  const Employees = [
    {
      name: "John Doe",
      id: "123456789",
      status: "active",
      department: "Finance",
      role: "Accountant",
      dateStarted: "20.3.2021",
    },
  ];

  return (
    <Card padding="none">
      <Table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID Number</th>
              <th>Department</th>
              <th>Current Role</th>
              <th>Date Started</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Employees.map((employee) => {
              return (
                <tr>
                  <td>{employee.id}</td>
                  <td className="current-status">
                    <Badge>{employee.status}</Badge>
                  </td>
                  <td className="n-caption">{employee.department}</td>
                  <td className="n-caption">{employee.role}</td>
                  <td className="n-caption n-table-align-left">
                    {employee.dateStarted}
                  </td>
                  <td>
                    <div>
                      <Dropdown position="block-end" align="end" size="s">
                        <Button slot="toggle" aria-describedby="edit" size="s">
                          <Icon
                            name="interface-menu-small"
                            label="Open menu"
                          ></Icon>
                        </Button>
                        <DropdownGroup>
                          <DropdownItem data-action="refund">
                            Detailed view
                          </DropdownItem>
                          <DropdownItem data-action="refund">
                            Edit employee record
                          </DropdownItem>
                        </DropdownGroup>
                        <DropdownGroup>
                          <DropdownItem data-action="delete">
                            <span>Delete</span>
                            <Icon slot="end" name="interface-delete"></Icon>
                          </DropdownItem>
                        </DropdownGroup>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
      <Tooltip id="edit" position="block-end">
        Edit this row
      </Tooltip>
    </Card>
  );
}

function Sidebar() {
  const { account } = useContext(authContext);
  return (
    <Navigation slot="nav">
      <h3
        style={{
          fontWeight: "400",
          marginBottom: "var(--n-space-m)",
          marginTop: "var(--n-space-s)",
        }}
      >
        Talent Verify
      </h3>
      <NavGroup>
        {[
          { title: "Employees", slug: "employees" },
          { title: "List of departments", slug: "list-of-departments" },
        ].map((n) => (
          <NavItem href="#" active icon="navigation">
            {n.title}
          </NavItem>
        ))}
      </NavGroup>
      <Dropdown expand slot="footer">
        <Button slot="toggle" expand>
          <Avatar
            aria-hidden="true"
            name="Laura Williams"
            slot="start"
          ></Avatar>
          Laura Williams
        </Button>
        <DropdownGroup>
          <DropdownItem href="#">View profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </DropdownGroup>
        <DropdownGroup>
          <DropdownItem>
            Show keyboard shortcuts
            <div slot="end" className="n-color-text-weaker n-font-size-xs">
              Cmd+K
            </div>
          </DropdownItem>
          <DropdownItem>Help & Support</DropdownItem>
          <DropdownItem>API</DropdownItem>
        </DropdownGroup>
        <DropdownItem>
          Sign out
          <Icon slot="end" name="interface-logout"></Icon>
        </DropdownItem>
      </Dropdown>
    </Navigation>
  );
}
