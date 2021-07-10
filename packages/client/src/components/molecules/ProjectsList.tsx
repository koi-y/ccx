import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Button,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	ListItemIcon,
	MenuItem,
	IconButton
} from "@material-ui/core";
import { 	Pencil,Delete } from "mdi-material-ui";
import useSWR from "swr";

import { route, GetResponse } from "common/auth-client/api/v1/projects";
import { jsonFetcher } from "utils/fetcher";
import DeleteprojectDialog from "components/molecules/DeleteprojectDialog";

type Props = {};


type DeleteProps = {
	project: string;
	onDeleteOpen: (deleted: string) => void;
};

const Deleteproject: React.FunctionComponent<DeleteProps> = ({
	project,
	onDeleteOpen
}) => {
	console.log("project");
	console.log(project)




	/*

	const handleDeleteOpen = React.useCallback(
		() => {onDeleteOpen(project)
			
			console.log("project2");
			console.log(project)
			
		},
		[project, onDeleteOpen]
	);

		*/

	return (
								
									<IconButton onclick = {() =>onDeleteOpen(project)}>
										<Delete />
									</IconButton>
								
	);
};





const ProjectsList: React.FunctionComponent<Props> = (props: Props) => {
	const history = useHistory();
	const [
		deleteproject,
		setDeleteproject
	] = React.useState<string | null>(null);
	const onDeleteOpen = React.useCallback(
		(project: string) => setDeleteproject(project),
		[setDeleteproject]
	);
	const onDeleteClose = React.useCallback(() => setDeleteproject(null), [
		setDeleteproject
	]);
	const { data,mutate } = useSWR(
		route(),
		jsonFetcher<GetResponse>(undefined, {
			403: (res) => {
				history.push("/login");
				return res;
			}
		})
	);

	const onDelete = (deleted: string) => {
		if (!data || data.error) {
			return;
		}
		
		const index = data.projects.findIndex(
			({ name }) => name === deleted
		);
		

		if (index >= 0) {
			mutate({
				projects: data.projects
					.slice(0, index)
					.concat(data.projects.slice(index + 1))
			});
		}
		
	};
	

	if (!data || data.error) {
		return null;
	}
	console.log("data");
	console.log(data)

	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>PROJECT</TableCell>
						<TableCell align="right">
							<Button
								variant="outlined"
								color="secondary"
								component={Link}
								to="/new"
							>
								Add project
							</Button>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.projects.map((project) => (
						<TableRow
							key={project.name}
							hover
						>
							<TableCell>
								<Link to={`/home/${project.name}`}>
									{project.name}
								</Link>
							</TableCell>
							<TableCell align="right" >
								<IconButton>
									<Pencil />
								</IconButton>
								</TableCell>
								<TableCell align="right" >
								<IconButton onClick = {() =>onDeleteOpen(project.name)}>
										<Delete />
									</IconButton>
									
								</TableCell>	
						</TableRow>
					))}
					
			<DeleteprojectDialog
				project={deleteproject}
				onClose={onDeleteClose}
				onDelete={onDelete}
			/>
				</TableBody>
				
			</Table>

		</TableContainer>
		
	);
};

export default ProjectsList;
/*
								<TableCell align="right">
									
								<Deleteproject
								project={project}
								onDeleteOpen={onDeleteOpen}
								/>





							</TableCell>

															<Deleteproject
								project={project.name}
								onDeleteOpen={onDeleteOpen}
								/>



			<DeleteprojectDialog
				project={deleteproject}
				onClose={onDeleteClose}
				onDelete={onDelete}
			/>

 */