export enum TaskStatusEnum {
  TODO = "clqzyhjg5000013q5h4v7m8vp",
  IN_PROGRESS = "clqzyhshf000113q51d16k6b0",
  DONE = "clqzyi289000213q5djuwbzyj",
}

export const obterStatus: {
  [key: string]: {
    nomeBotao: string;
    proxStatus: TaskStatusEnum;
  };
} = {
  [TaskStatusEnum.TODO]: {
    nomeBotao: "Iniciar",
    proxStatus: TaskStatusEnum.IN_PROGRESS,
  },
  [TaskStatusEnum.IN_PROGRESS]: {
    nomeBotao: "Concluir",
    proxStatus: TaskStatusEnum.DONE,
  },
};
