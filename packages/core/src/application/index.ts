import logger from "utils/logger";
import { PluginFileSystemRepository } from "infrastructure/repositories/PluginFileSystemRepository";
import { GlobalConfig } from "domain/entity/GlobalConfig";
import { InitializationService } from "domain/services/InitializationService";
import { WorkerHttpClientFactory } from "infrastructure/factory/WorkerHttpClientFactory";
import { WorkerInMemoryRepository } from "infrastructure/repositories/WorkerInMemoryRepository";
import { Registry } from "types/registry";
import { TemporaryStoreFileSystemRepository } from "infrastructure/repositories/TemporalyStoreFileSystemRepository";
import { Executor } from "application/executor";

const main = async () => {
	const pluginRepository = await PluginFileSystemRepository.init(
		"/ccx-store"
	);
		/*
	const GlobalConfigObject = {
		apiAddr: process.env.API_PORT;
		gitAddr: process.env.GIT_PORT;
		sessionSecret: process.env.SESSION_SECRET;
		sessionDbUri: process.env.SESSION_DB_URI;
		dbUri: process.env.DB_URI;
		workers: process.env.WORKERS
	};
	*/
	// await new Promise((resolve) => setTimeout(resolve, 5000));
	pluginRepository.startGitDaemon();
	const config :Partial<Record<"WORKERS" | "CONTROLLER_HOST" | "API_PORT" | "GIT_PORT" | "SESSION_SECRET" | "SESSION_DB_URI" | "DB_URI", string>> = {
		API_PORT: process.env.API_PORT,
		GIT_PORT: process.env.GIT_PORT,
		SESSION_SECRET: process.env.SESSION_SECRET,
		SESSION_DB_URI: process.env.SESSION_DB_URI,
		DB_URI: process.env.DB_URI,
		CONTROLLER_HOST: process.env.CONTROLLER_HOST,
		WORKERS: process.env.WORKERS
	}
	const registry: Registry = {
		workerClientFactory: new WorkerHttpClientFactory(),
		workerRepository: new WorkerInMemoryRepository(),
		globalConfig: new GlobalConfig(config),
		pluginRepository,
		temporaryStoreRepository: new TemporaryStoreFileSystemRepository()
	};

	const app = await new InitializationService().exec(registry);

	const server = app.listen(4000, () => {
		const address = server.address();
		if (!address) {
			logger.fatal(`Failed to start CCX Core server on port 4000`);
		} else if (typeof address === "string") {
			logger.info(`CCX Core server is running on ${address}`);
		} else {
			logger.info(
				`CCX Core server is running on [${address.address}]:${address.port}`
			);
		}
	});

	new Executor(registry).waitJob();

	process.on("unhandledRejection", (reason, promise) => {
		logger.fatal(`Unhandled rejection:
	${JSON.stringify(reason, undefined, 2)}
	${JSON.stringify(promise, undefined, 2)}`);
	});
};

main();
