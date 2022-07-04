import React, { useEffect, useState, useId } from "react";
import { Grid, Typography } from "@mui/material";
import Issue from "./TenantIssue/Issue/Issue";
import { useSelector } from "react-redux";
import { deleteIssue, retrieveIssueFromProperty, retrieveIssues, updateIssue } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from "sweetalert2";

const Issues = () => {
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userType = useSelector((state) => state.users.userType);
    const params = useParams();
    //Retrieve issues from backend
    useEffect(() => {
        if (userType === "Tenant") {
            retrieveIssues(isLoggedIn)
                .then((res) => {
                    setIssues(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            retrieveIssueFromProperty(params.propertyId)
                .then((res) => {
                    setIssues(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const columnsFromBackend = {
        [useId()]: {
            name: "Requested",
            items: issues
        },
        [useId()]: {
            name: "In Progress",
            items: []
        },
        [useId()]: {
            name: "Done",
            items: []
        }
    };
    //Columns is an empty array
    const [columns, setColumns ] = useState(columnsFromBackend);

    const editIssue = (issueId) => {
        navigate(`/editIssue/${isLoggedIn}/${issueId}`);
    };

    const updateStatus = (issueId, issue) => {
        updateIssue(issueId, issue)
            .then(r => {
                removeIssue(issueId);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeIssue = (issueId) => {
        deleteIssue(isLoggedIn, issueId)
            .then(() => {
                setIssues(issues.filter(issue => issue._id !== issueId));
                Swal.fire("Issue Deleted", `The issue has been deleted`, "success");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    //Kanban Board Layout
    return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item._id}
                                                            draggableId={item._id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            padding: 16,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.issueDescription}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
};

export default Issues;