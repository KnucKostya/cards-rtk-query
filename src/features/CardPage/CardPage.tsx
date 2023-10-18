import { useGetRandomCardWithQuery } from '@/services/cardService/cardApi'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RadioGroup } from '@/components/ui/radioGroup'
import { useParams } from 'react-router-dom'
import s from './CardPage.module.scss'

export const CardPage = () => {
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)
  const [previousCardId, setPreviousCardId] = useState<string | undefined>()

  const { deckId, deckName } = useParams<{ deckId: string; deckName: string }>()

  const { data } = useGetRandomCardWithQuery({ deckId, previousCardId })

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
        <Button onClick={isShowAnswer ? nextQuestion : onShowAnswer}>
          {isShowAnswer ? 'Next Question' : 'Show Answer'}
        </Button>
      </Card>
    </div>
  )
}
