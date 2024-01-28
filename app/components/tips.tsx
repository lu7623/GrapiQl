import { H2, H3, TYPE_BTN } from "../styles/uni-classes";
import { useDict } from "../utils/useDictHook";
import { useServerRequestContext } from "../context/contexts";
import { Field, InputField, OfType, QueryType } from "../types";
import { useTipsCreator } from "../utils/help-utils";

export const RootTypesDesc = () => {
  const dict = useDict();
  const tipsCreator = useTipsCreator();
  const {
    state: { fullSchema },
  } = useServerRequestContext();
  if (fullSchema) {
    const { queryType, mutationType, subscriptionType } = fullSchema;
    const rootTypes = [queryType, mutationType, subscriptionType]
      .filter((item) => item !== null)
      .map((rootType) => {
        if (rootType) {
          return (
            <div
              className="flex flex-row gap-1 items-center"
              key={rootType.name}
            >
              <button
                className={TYPE_BTN}
                onClick={() => tipsCreator(rootType.name)}
              >
                {rootType.name}
              </button>
            </div>
          );
        }
        return null;
      });
    return (
      <div>
        <h2 className={H2}>{dict.rootTypes}</h2>
        {rootTypes}
        <AllTypesList types={fullSchema.types} />
      </div>
    );
  }
};

const AllTypesList = ({ types }: { types: QueryType[] }) => {
  const dict = useDict();
  const tipsCreator = useTipsCreator();
  const nonSystemTypes = types.filter((type) => !type.name.startsWith("_"));
  const typesList = nonSystemTypes.map((type) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={type.name}>
        <button className={TYPE_BTN} onClick={() => tipsCreator(type.name)}>
          {type.name}
        </button>
      </div>
    );
  });
  return (
    <div>
      <h2 className={H2}>{dict.types}</h2>
      {typesList}
    </div>
  );
};

export const ObjectTooltip = ({ entity }: { entity: QueryType }) => {
  const dict = useDict();
  return (
    <div className="w-full h-full absolute bg-white">
      <h2 className={H2}>{entity.name}</h2>
      <p>
        {dict.kind}: ({entity.kind})
      </p>
      <p>
        {dict.description}: {entity.description || dict.notProvided}
      </p>
      {entity.fields && (
        <>
          <p className={H2}>{dict.fields}:</p>
          <FieldsParser fields={entity.fields} />
        </>
      )}
      {entity.inputFields && (
        <>
          <p className={H2}>{dict.fields}:</p>
          <InputFieldsParser fields={entity.inputFields} />
        </>
      )}
    </div>
  );
};

export const FieldsParser = ({ fields }: { fields: Field[] }) => {
  return fields.map((field) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={field.name}>
        <span className={H3}>{field.name}</span>
        (<ArgsParser field={field} />
        ):
        <ReturnValueParser field={field} />
      </div>
    );
  });
};

export const ReturnValueParser = ({ field }: { field: Field }) => {
  return <OfTypeParser entity={field.type} />;
};

export const InputFieldsParser = ({ fields }: { fields: InputField[] }) => {
  return fields.map((field) => {
    return (
      <div className="flex flex-row gap-1 items-center" key={field.name}>
        <span className={H3}>{field.name}</span>
        <OfTypeParser entity={field.type} />
      </div>
    );
  });
};

export const ArgsParser = ({ field }: { field: Field }) => {
  if (field.args.length === 0) return null;
  return field.args.map((arg) => {
    return (
      <span key={arg.name + field.name}>
        {arg.name}: <OfTypeParser entity={arg.type} />
      </span>
    );
  });
};

export const OfTypeParser = ({ entity }: { entity: OfType }) => {
  const tipsCreator = useTipsCreator();
  switch (entity.kind) {
    case "NON_NULL":
      return (
        <span>{entity.ofType && <OfTypeParser entity={entity.ofType} />}!</span>
      );
    case "LIST":
      return (
        <span>
          [{entity.ofType && <OfTypeParser entity={entity.ofType} />}]
        </span>
      );
    case "INPUT_OBJECT":
      return (
        <span>
          <button
            className={TYPE_BTN}
            onClick={() => tipsCreator(entity.name as string)}
          >
            {entity.name}
          </button>
          = &#123;&#125;
        </span>
      );
    case "SCALAR":
    case "OBJECT":
      return (
        <button
          className={TYPE_BTN}
          onClick={() => tipsCreator(entity.name as string)}
        >
          {entity.name}
        </button>
      );

    default:
      return <span>Value</span>;
  }
};
