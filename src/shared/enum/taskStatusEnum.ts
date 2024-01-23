export enum TaskStatusEnum {
  TODO = "clrpo2f4n00006ahroy1xq6rl",
  IN_PROGRESS = "clrpo416i00016ahr5kaqkoar",
  DONE = "clrpo5nnh00026ahr71j6yusy",
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
