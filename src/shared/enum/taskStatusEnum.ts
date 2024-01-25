export enum TaskStatusEnum {
  TODO = "clrslqlgy0000j6ej0c2lxdbp",
  IN_PROGRESS = "clrslqlgz0001j6ejapd8tiuq",
  DONE = "clrslqlgz0002j6ejvujc157u",
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
