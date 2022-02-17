import eventBus from '@/helpers/eventBus'
import { ToastParams } from '@/components/toaster/index'

/**
 * Управляющий класс, отвечающий за вызов тостов определённых типов и обработку
 * кнопок в тостах.
 */
export default class Toaster {
  /**
   * Вызывает тост с типом "info".
   * @param params - Параметры тоста, установленные при его вызове.
   */
  info(params: ToastParams): any {
    if (params.primaryAction || params.secondaryAction) {
      this.initToastIdListener(params.primaryActionCallback!, params.secondaryActionCallback)
      this.initToastClosedListener()
    }

    eventBus.$emit('show', {
      type: 'info',
      ...params,
    })
  }

  /**
   * Вызывает тост с типом "info".
   * @param params - Параметры тоста, установленные при его вызове.
   */
  danger(params: ToastParams): void {
    if (params.primaryAction || params.secondaryAction) {
      this.initToastIdListener(params.primaryActionCallback!, params.secondaryActionCallback)
      this.initToastClosedListener()
    }

    eventBus.$emit('show', {
      type: 'danger',
      ...params,
    })
  }

  /**
   * Инициализирует лисенер для события "toast-added".
   * Необходим, для получения ID тоста после его инициализации.
   * @param primaryActionCallback - Коллбэк для главной (первой) кнопки тоста.
   * Устанавливается в параметрах при вызове тоста.
   * @param [secondaryActionCallback]- Коллбэк для второстепенной (второй) кнопки тоста.
   * Устанавливается в параметрах при вызове тоста.
   * @protected
   */
  protected initToastIdListener(
    primaryActionCallback: Function,
    secondaryActionCallback?: Function,
  ): void {
    eventBus.$off('toast-added')
    eventBus.$on('toast-added', (id: string) => {
      this.initActionListener(id, primaryActionCallback, secondaryActionCallback)
    })
  }

  /**
   * Инициализирует слушатель для события "toast-closed".
   * Необходим для отписки от событий кнопок тоста.
   * @protected
   */
  protected initToastClosedListener(): void {
    eventBus.$off('toast-closed')
    eventBus.$on('toast-closed', this.disableActionListener)
  }

  /**
   * Инициализирует слушатель для событий кнопок тоста.
   * При отработке события вызывает колбэк, полученный из параметров.
   * @param id - ID тоста.
   * @param primaryActionCallback - Коллбэк для главной (первой) кнопки тоста.
   * Устанавливается в параметрах при вызове тоста.
   * @param [secondaryActionCallback]- Коллбэк для второстепенной (второй) кнопки тоста.
   * Устанавливается в параметрах при вызове тоста.
   * @protected
   */
  protected initActionListener(
    id: string,
    primaryActionCallback: Function,
    secondaryActionCallback?: Function,
  ): void {
    eventBus.$on(`${id}-primary-action-event`, primaryActionCallback)

    if (secondaryActionCallback) {
      eventBus.$on(`${id}-secondary-action-event`, secondaryActionCallback)
    }
  }

  /**
   * Отписывает от событий кнопок в тостах.
   * @param id - ID тоста.
   * @protected
   */
  protected disableActionListener(id: string): void {
    eventBus.$off(`${id}-primary-action-event`)
    eventBus.$off(`${id}-secondary-action-event`)
  }
}
