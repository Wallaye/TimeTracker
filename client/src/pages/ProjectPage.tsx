import React, {FC, useContext, useEffect, useState} from "react";
import {IProject} from "../models/IProject";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import ProjectService from "../services/projectService";
import {IError} from "../models/IError";
import NavBar from "../components/NavBar";
import ActivityItem from "../components/ActivityItem";

const ProjectPage: FC = () => {
    const {id} = useParams<string>();
    const {userStore, actStore} = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState<IError | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [fields, setFields] = useState<IProject>({
        projectId: -1,
        user: userStore.user.userId,
        name: "",
        activities: []
    });
    useEffect(() => {
        if (id != '-1') {
            setLoading(true);
            try {
                ProjectService.getProject(+id!).then(proj => {
                    console.log(proj.data);
                    setFields(proj.data);
                }).catch(reason => {
                    console.error(reason);
                    setError({message: reason.response.data.message, status: reason.response.status})
                })
            } catch (e: any) {
                console.error(e);
                setError({message: e.response.data.message, status: e.response.status})
            } finally {
                setLoading(false)
            }
        }
    }, [])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFields({...fields, [name]: value});
    }

    if (isLoading) {
        return <div className="align-self-center spinner-border text-primary" role="status">
            <span className="sr-only"></span>
        </div>
    }

    if (error != null) {
        return <>
            <NavBar userName={userStore.user.userName}/>
            <div className="container d-grid">
                <div className="row">
                    <h1 className="text-danger">{error.status}</h1>
                </div>
                <div className="row">
                    <h2 className="text-danger">{error.message}</h2>
                </div>
            </div>
        </>
    }

    return (
        <>
            <NavBar userName={userStore.user.userName}></NavBar>
            {fields.projectId != -1 && <button onClick={() => {
                ProjectService.deleteProject(fields.projectId);
                navigate('/api/projects/');
            }
            } className="btn btn-danger">
                Удалить</button>}
            <input hidden name="id" value={fields.projectId}/>
            <div className={"form-group"}>
                <label htmlFor="title">Название</label>
                <input className="form-control" name="name" onChange={handleChange} value={fields.name}
                       required/>
            </div>
            {fields.name.trim() != "" && fields.projectId == -1 &&
                <button className="btn btn-primary mt-2" onClick={() => {
                    ProjectService.addProject(fields).then(
                        data => {
                            setFields(data.data);
                            navigate(`/api/projects/${data.data.projectId}`);
                        }
                    );
                }}>
                    Добавить</button>}
            {fields.name.trim() != "" && fields.projectId != -1 &&
                <button className="btn btn-primary mt-2" onClick={() => {
                    ProjectService.editProject(fields, userStore.user.userId);
                }}>
                    Сохранить</button>}
            {fields.activities.length != 0 &&
                <table className="table table-hover table-bordered mt2">
                    <thead className="thead-light">
                    <tr>
                        <th>Имя</th>
                        <th>Проект</th>
                        <th>Дата и время начала</th>
                        <th>Дата и время конца</th>
                        <th>Завершена</th>
                        <th>Время</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.activities.map(el => {
                        let act = actStore.activities.find(a => a.activityId == el)
                        return <ActivityItem key={act!.activityId}
                                      onClick={(act) => navigate('/api/activities/' + act.activityId)}
                                      activity={act!}/>
                    }
                    )}
                    </tbody>
                </table>}

        </>
    )
}

export default ProjectPage;