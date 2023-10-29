import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from "./styles";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    reset();
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const task = watch('task');
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="" />
          </datalist>

          <label htmlFor="minutsAmount">durante</label>
          <MinutesAmountInput
            id="minutsAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutsAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size="24" />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}