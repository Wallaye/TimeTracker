import React, {FC, useContext} from 'react';
import {IActivity} from "../models/IActivity";
import {toDate, getTimeDiff} from "../utility/Utils";
import {useParams} from "react-router-dom";
import {Context} from "../index";

interface ActivityItemProps {
    activity: IActivity,
    onClick: (activity: IActivity) => void
}

const ActivityItem: FC<ActivityItemProps> = ({activity, onClick}) => {
    const {projStore} = useContext(Context);
    const getProj = () => {
        return projStore.projects.find(el => el.projectId == activity.project)?.name;
    }
    return (
        <tr className="table-hover" onClick={() => {onClick(activity)}}>
            <td>{activity.name}</td>
            <td>{getProj() ?? ""}</td>
            <td>{toDate(activity.startDate)}</td>
            <td>{toDate(activity.finishDate)}</td>
            <td>{activity.isFinished ? "Да" : "Нет"}</td>
            <td>{getTimeDiff(activity.startDate, activity.finishDate)}</td>
        </tr>
    );
};

export default ActivityItem;