import * as React from 'react'
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card' 
import { Input } from '@/components/ui/input' 
import { Label } from '@/components/ui/label' 
import { Button } from '@/components/ui/button' 
import { Textarea } from '@/components/ui/textarea' 
import { cn } from '@/lib/utils' // クラス名を組み合わせるためのユーティリティ

import { contactFormAction } from '@/lib/actions' 
import { Check } from 'lucide-react' 

// ContactForm コンポーネントの定義
export function ContactForm({
  className // 外部から受け取るカスタムクラス
}) {
  // フォームの状態を管理するためのカスタムフックを使用
  const [state, formAction, pending] = React.useActionState(contactFormAction, {
    defaultValues: {
      name: '', 
      email: '', 
      message: '',
    },
    success: false,
    errors: null,
  });

  // フォームのUIをレンダリング
  return (
    (<Card className={cn('w-full max-w-md', className)}> {/* カードのラッパー */}
      <CardHeader>
        <CardTitle>How can we help?</CardTitle> {/* タイトル */}
        <CardDescription>
          Need help with your project? We&apos;re here to assist you.
        </CardDescription> {/* 説明 */}
      </CardHeader>
      <form action={formAction}> {/* フォームのアクション */}
        <CardContent className="flex flex-col gap-6"> {/* フォームのコンテンツ */}
          {state.success ? ( // 送信成功時のメッセージ
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Check className="size-4" /> {/* チェックマークアイコン */}
              Your message has been sent. Thank you.
            </p>
          ) : null}
          {/* 名前フィールド */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.name}>
            <Label
              htmlFor="name"
              className="group-data-[invalid=true]/field:text-destructive">
              Name <span aria-hidden="true">*</span> {/* 必須マーク */}
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Lee Robinson" 
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending} // 送信中は無効化
              aria-invalid={!!state.errors?.name}
              aria-errormessage="error-name"
              defaultValue={state.defaultValues.name} />
            {state.errors?.name && ( // エラーメッセージ表示
              <p id="error-name" className="text-destructive text-sm">
                {state.errors.name}
              </p>
            )}
          </div>
          {/* メールフィールド */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.email}>
            <Label
              htmlFor="email"
              className="group-data-[invalid=true]/field:text-destructive">
              Email <span aria-hidden="true">*</span> {/* 必須マーク */}
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="leerob@acme.com"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending} // 送信中は無効化
              aria-invalid={!!state.errors?.email}
              aria-errormessage="error-email"
              defaultValue={state.defaultValues.email} />
            {state.errors?.email && ( // エラーメッセージ表示
              <p id="error-email" className="text-destructive text-sm">
                {state.errors.email}
              </p>
            )}
          </div>
          {/* メッセージフィールド */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.message}>
            <Label
              htmlFor="message"
              className="group-data-[invalid=true]/field:text-destructive">
              Message <span aria-hidden="true">*</span> {/* 必須マーク */}
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..." // プレースホルダー
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending} // 送信中は無効化
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message} />
            {state.errors?.message && ( // エラーメッセージ表示
              <p id="error-message" className="text-destructive text-sm">
                {state.errors.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter> {/* フォームの送信ボタン */}
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? 'Sending...' : 'Send Message'} {/* 送信中の表示 */}
          </Button>
        </CardFooter>
      </form>
    </Card>)
  );
}
