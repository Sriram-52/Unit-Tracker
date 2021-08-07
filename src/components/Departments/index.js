import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../middleware/auth";
import { get, onAdd, onDelete, onUpdate } from "../../middleware/departments";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Departments() {
  const departments = useSelector((state) => state.departments);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Title",
      field: "title",
      render: ({ id, title }) => <Link to={`/subjects/${id}`}>{title}</Link>,
    },
    { title: "Description", field: "description" },
  ];

  const rows = Object.values(departments.get.data).map((item) => {
    return {
      title: item.title,
      description: item.description,
      id: item.id,
    };
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Departments
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div />
      <main>
        <MaterialTable
          title="Departments"
          columns={columns}
          isLoading={
            departments.get.isLoading ||
            departments.update.isLoading ||
            departments.create.isLoading ||
            departments.delete.isLoading
          }
          data={rows}
          editable={{
            onRowAdd: (newData) => dispatch(onAdd(newData)),
            onRowUpdate: (newData, oldData) =>
              dispatch(onUpdate(oldData.id, newData)),
            onRowDelete: (oldData) => dispatch(onDelete(oldData.id)),
          }}
          options={{
            pageSize: 10,
            paginationPosition: "top",
            pageSizeOptions: [10, 20, 50],
          }}
        />
      </main>
    </div>
  );
}
