import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { get, onAdd, onDelete, onUpdate } from "../../middleware/subjects";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

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

export default function Subjects(props) {
  const {
    match: {
      params: { deptId },
    },
  } = props;
  const subjects = useSelector((state) => state.subjects);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(get(deptId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Title",
      field: "title",
      render: ({ id, title }) => (
        <Link to={`/units/${deptId}/${id}`}>{title}</Link>
      ),
    },
    { title: "Description", field: "description" },
  ];

  const rows = Object.values(subjects.get.data).map((item) => {
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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Subjects
          </Typography>
        </Toolbar>
      </AppBar>
      <div />
      <main>
        <MaterialTable
          title="Subjects"
          columns={columns}
          isLoading={
            subjects.get.isLoading ||
            subjects.update.isLoading ||
            subjects.create.isLoading ||
            subjects.delete.isLoading
          }
          data={rows}
          editable={{
            onRowAdd: (newData) => dispatch(onAdd(newData, deptId)),
            onRowUpdate: (newData, oldData) =>
              dispatch(onUpdate(deptId, oldData.id, newData)),
            onRowDelete: (oldData) => dispatch(onDelete(deptId, oldData.id)),
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
