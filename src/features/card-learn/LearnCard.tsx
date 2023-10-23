import { useGetRandomCardWithQuery } from '@/services/learn-service/learn.service.ts'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radioGroup'
import { useLocation, useParams } from 'react-router-dom'
import s from './LearnCard.module.scss'

export const LearnCard = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)
  const [previousCardId, setPreviousCardId] = useState<string | undefined>()

  const { deckName } = useParams<{ deckName: string }>()
  const location = useLocation()

  const { data, isLoading } = useGetRandomCardWithQuery({
    deckId: location.state.id,
    previousCardId,
  })

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const nextQuestion = () => {
    setPreviousCardId(data?.id)
  }

  const rating = [
    {
      label: 'Did not know',
      value: '0',
    },
    {
      label: 'Forgot',
      value: '1',
    },
    {
      label: 'A lot of though',
      value: '2',
    },
    {
      label: 'Confused',
      value: '3',
    },
    {
      label: 'Knew the answer',
      value: '4',
    },
  ]

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <Typography htmlTag={'h2'} variant={'h1'} className={s.title}>
          Learn &quot;{deckName}&quot;
        </Typography>
        <div className={s.question}>
          <Typography htmlTag={'h3'} variant={'body1'}>
            {data?.question}
          </Typography>
          <Typography htmlTag={'p'} variant={'body2'} className={s.attempts}>
            количество попыток ответа на вопрос: 10
          </Typography>
        </div>
        {isShowAnswer && (
          <div className={s.rating}>
            <Typography variant={'body1'} htmlTag={'p'}>
              <b>Answer:</b> {data?.answer}
            </Typography>
            <Typography variant={'body1'} htmlTag={'p'}>
              <b>Rate yourself:</b>
            </Typography>
            <RadioGroup options={rating} />
          </div>
        )}
        <Button fullWidth onClick={isShowAnswer ? nextQuestion : onShowAnswer}>
          <Typography variant={'subtitle2'}>
            {isShowAnswer ? 'Next Question' : 'Show Answer'}
          </Typography>
        </Button>
      </Card>
    </div>
  )
}
