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
import { get, onAdd, onDelete, onUpdate } from "../../middleware/units";
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

export default function Units(props) {
  const {
    match: {
      params: { deptId, subjectId },
    },
  } = props;
  const units = useSelector((state) => state.units);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(get(deptId, subjectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Title",
      field: "title",
      render: ({ id, title }) => (
        <Link to={`/topics/${deptId}/${subjectId}/${id}`}>{title}</Link>
      ),
    },
    { title: "Description", field: "description" },
  ];

  const rows = Object.values(units.get.data).map((item) => {
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
            Units
          </Typography>
        </Toolbar>
      </AppBar>
      <div />
      <main>
        <MaterialTable
          title="Units"
          columns={columns}
          isLoading={
            units.get.isLoading ||
            units.update.isLoading ||
            units.create.isLoading ||
            units.delete.isLoading
          }
          data={rows}
          editable={{
            onRowAdd: (newData) => dispatch(onAdd(newData, deptId, subjectId)),
            onRowUpdate: (newData, oldData) =>
              dispatch(onUpdate(deptId, subjectId, oldData.id, newData)),
            onRowDelete: (oldData) =>
              dispatch(onDelete(deptId, subjectId, oldData.id)),
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
