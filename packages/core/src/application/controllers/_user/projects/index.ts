import express from "express";

import ProjectEntity from "common/all/types/ProjectEntity";
import * as projects from "common/auth-core/api/_user/projects/index";
import useAsync from "common/server-only/middlewares/useAsync";
import validateRequest from "common/server-only/middlewares/validateRequest";

import projectName from "application/controllers/_user/projects/_projectName";
import ImportingProjectByGitURL from "domain/commands/ImportingProjectByGitURL";
import ProjectService from "domain/services/ProjectService";
import { createProjectEntity } from "domain/factories/createInternalProjectEntity";
import { createEntityId } from "common/server-only/value-objects/EntityId";
import { fromValue } from "common/all/types/Result";
import { Registry } from "types/registry";
import {
	PostRequest,
	PostResponse,
	route
} from "common/auth-client/api/v1/projects";

const router = express.Router({ mergeParams: true });

const defineRoute = (registry: Registry): express.Router => {
	// for fetching own projects
	router.get<{ userEntityId: string }, projects.GetResponse>(
		"/",
		useAsync(async (req, res) => {			
			const { userEntityId } = req.params;
			const projectsWithoutSecrets = (
				await ProjectService.findProjectsByOwnerId(
					createEntityId(userEntityId)
				)
			).map((project): ProjectEntity => createProjectEntity(project));

			res.send(
				fromValue({
					projects: projectsWithoutSecrets
				})
			);
		})
	);

	// for creating a project
	router.post<
		{ userEntityId: string },
		projects.PostResponse,
		projects.PostRequest
	>(
		"/",
		validateRequest(projects.postRequest),
		useAsync(async (req, res) => {
			const { userEntityId } = req.params;
			const { gitURL } = req.body;	
			//console.log("req");
			//console.log(req);
			//console.log("res");
			//console.log(res);
			const project = await new ImportingProjectByGitURL(
				createEntityId(userEntityId),
				gitURL
			).exec();

			if (!project) {
				res.status(500).send(undefined);
				throw new Error("failed to fetch project");
			}
			else if(typeof project == 'number'){
				res.status(409).send(undefined);
			}
			else{
				res.send(fromValue(project));
			}
		})
	);


	router.use("/:projectName", projectName(registry));

	return router;
};




export default defineRoute;
