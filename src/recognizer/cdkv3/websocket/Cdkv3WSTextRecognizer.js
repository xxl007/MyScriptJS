import { modelLogger as logger } from '../../../configuration/LoggerConfig';
import * as Cdkv3WSRecognizerUtil from './Cdkv3WSRecognizerUtil';

export { reset, close } from './Cdkv3WSRecognizerUtil';
export { manageResetState } from '../common/Cdkv3CommonResetBehavior';
export { getAvailableRecognitionSlots } from '../common/Cdkv3CommonTextRecognizer'; // Re-use the recognition type for text

function buildStartInput(paperOptionsReference, strokes) {
  return {
    type: 'start',
    textParameter: paperOptionsReference.recognitionParams.textParameter,
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
    }]
  };
}

function buildContinueInput(strokes) {
  return {
    type: 'continue',
    inputUnits: [{
      textInputType: 'MULTI_LINE_TEXT',
      components: strokes
    }]
  };
}

function processTextResult(modelParam, recognitionData) {
  const modelUnderRecognition = modelParam;
  logger.debug('Cdkv3WSTextRecognizer update model', recognitionData);
  // Update model
  modelUnderRecognition.rawResult = recognitionData;
  return modelUnderRecognition;
}


export function init(paperOptions, recognizerContext) {
  const suffixUrl = '/api/v3.0/recognition/ws/text';
  return Cdkv3WSRecognizerUtil.init(suffixUrl, paperOptions, recognizerContext);
}

/**
 * Do the recognition
 * @param paperOptionsParam
 * @param modelParam
 * @param recognizerContext
 * @returns {Promise} Promise that return an updated model as a result}
 */
export function recognize(paperOptionsParam, modelParam, recognizerContext) {
  return Cdkv3WSRecognizerUtil.recognize(paperOptionsParam, recognizerContext, modelParam, buildStartInput, buildContinueInput, processTextResult);
}

