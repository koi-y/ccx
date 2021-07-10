import React from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	DialogContentText,
	DialogTitle
} from "@material-ui/core";

import api from "utils/api";

import HistoryId from "common/all/types/HistoryId";
import { route, GetResponse } from "common/auth-client/api/v1/projects/_projectName";

type Props = {
	project: string;
	onClose: () => void;
	onDelete: (historyId: HistoryId) => void;
};

const DeleteprojectDialog: React.FunctionComponent<Props> = ({
	project,
	onClose,
	onDelete
}) => {
	const onAgree = React.useCallback(() => {
		if (project === null) {
			return;
		}
		(async () => {
			const res = await api.delete(route(project), {
				throwHttpErrors: false
			});
			console.log(res);
			if (res.status === 200) {
				onDelete(project);
			}

			onClose();
		})();
	}, [project, onDelete, onClose]);

	return (
		<Dialog open={project !== null} onClose={onClose}>
			<DialogTitle>Delete project?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Do you really want to delete project {project}?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onClose}>
					Do not delete
				</Button>
				<Button color="secondary" onClick={onAgree}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteprojectDialog;
