import { Injectable } from '@nestjs/common'
import { Scene, SceneEnter, SceneLeave, Command, Action, On, Ctx } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import type { SceneContext } from 'telegraf/scenes'

@Injectable()
@Scene('EXAMPLE_SCENE')
export class ExampleScene {
    @SceneEnter()
    async onSceneEnter(@Ctx() ctx: SceneContext) {
        await ctx.reply(
            'Добро пожаловать в пример сцены! 🎭\n\n' + 'Эта сцена демонстрирует работу с wizard-режимом.\n' + 'Введите ваше имя:',
            Markup.keyboard(['🚪 Выход']).resize()
        )
    }

    @On('text')
    async onText(@Ctx() ctx: SceneContext) {
        const text = (ctx.message as any).text

        if (text === '🚪 Выход') {
            await ctx.scene.leave()
            return
        }

        // Сохраняем данные в состоянии сцены
        ctx.scene.state = { ...ctx.scene.state, name: text }

        await ctx.reply(`Приятно познакомиться, ${text}! Теперь введите ваш возраст:`)

        // Переходим к следующему шагу
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ctx.wizard.next()
    }

    @On('text')
    async onAge(@Ctx() ctx: SceneContext) {
        const text = (ctx.message as any).text
        const age = parseInt(text)

        if (isNaN(age)) {
            await ctx.reply('Пожалуйста, введите число для возраста:')
            return
        }

        // Сохраняем возраст
        ctx.scene.state = { ...ctx.scene.state, age }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { name } = ctx.scene.state

        await ctx.reply(
            `Отлично! Вот ваши данные:\n\n` + `Имя: ${name}\n` + `Возраст: ${age} лет\n\n` + `Сцена завершена!`,
            Markup.removeKeyboard()
        )

        await ctx.scene.leave()
    }

    @SceneLeave()
    async onSceneLeave(@Ctx() ctx: SceneContext) {
        await ctx.reply('Вы вышли из сцены. Возвращайтесь!', Markup.removeKeyboard())
    }

    @Command('exit')
    async onExitCommand(@Ctx() ctx: SceneContext) {
        await ctx.scene.leave()
    }
}
