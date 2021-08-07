import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get, onAdd, onDelete, onUpdate } from "../../middleware/topics";
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

export default function Topics(props) {
  const {
    match: {
      params: { deptId, subjectId, unitId },
    },
  } = props;
  const classes = useStyles();
  const topics = useSelector((state) => state.topics);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(get(deptId, subjectId, unitId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [{ title: "Title", field: "title" }];

  const completedRows = [];

  const pendingRows = [];

  Object.values(topics.get.data).forEach((item) => {
    const topic = {
      title: item.title,
      id: item.id,
    };
    if (!item.isExist) {
      completedRows.push(topic);
    } else {
      pendingRows.push(topic);
    }
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
            Topics
          </Typography>
        </Toolbar>
      </AppBar>
      <div />
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <MaterialTable
              title="Completed Topics"
              columns={columns}
              isLoading={
                topics.get.isLoading ||
                topics.update.isLoading ||
                topics.create.isLoading ||
                topics.delete.isLoading
              }
              data={completedRows}
              editable={{
                onRowAdd: (newData) =>
                  dispatch(onAdd(newData, deptId, subjectId, unitId)),
                onRowUpdate: (newData, oldData) =>
                  dispatch(
                    onUpdate(deptId, subjectId, unitId, oldData.id, newData)
                  ),
                onRowDelete: (oldData) =>
                  dispatch(onDelete(deptId, subjectId, unitId, oldData.id)),
              }}
              options={{
                pageSize: 10,
                paginationPosition: "top",
                pageSizeOptions: [10, 20, 50],
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <MaterialTable
              title="Pending Topics"
              columns={columns}
              isLoading={
                topics.get.isLoading ||
                topics.update.isLoading ||
                topics.create.isLoading ||
                topics.delete.isLoading
              }
              data={pendingRows}
              editable={{
                onRowAdd: (newData) =>
                  dispatch(onAdd(newData, deptId, subjectId, unitId)),
                onRowUpdate: (newData, oldData) =>
                  dispatch(
                    onUpdate(deptId, subjectId, unitId, oldData.id, newData)
                  ),
                onRowDelete: (oldData) =>
                  dispatch(onDelete(deptId, subjectId, unitId, oldData.id)),
              }}
              options={{
                pageSize: 10,
                paginationPosition: "top",
              }}
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
