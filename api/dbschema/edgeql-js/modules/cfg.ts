// GENERATED by @edgedb/generate v0.3.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $AllowBareDDL = {
  "AlwaysAllow": $.$expr_Literal<$AllowBareDDL>;
  "NeverAllow": $.$expr_Literal<$AllowBareDDL>;
} & $.EnumType<"cfg::AllowBareDDL", ["AlwaysAllow", "NeverAllow"]>;
const AllowBareDDL: $AllowBareDDL = $.makeType<$AllowBareDDL>(_.spec, "1ed98418-108a-11ee-bdee-53ce3ab3f284", _.syntax.literal);

export type $ConnectionTransport = {
  "TCP": $.$expr_Literal<$ConnectionTransport>;
  "TCP_PG": $.$expr_Literal<$ConnectionTransport>;
  "HTTP": $.$expr_Literal<$ConnectionTransport>;
} & $.EnumType<"cfg::ConnectionTransport", ["TCP", "TCP_PG", "HTTP"]>;
const ConnectionTransport: $ConnectionTransport = $.makeType<$ConnectionTransport>(_.spec, "1eda2e3d-108a-11ee-a723-f3f41a573035", _.syntax.literal);

export type $memory = $.ScalarType<"cfg::memory", _.edgedb.ConfigMemory>;
const memory: $.scalarTypeWithConstructor<$memory, string> = $.makeType<$.scalarTypeWithConstructor<$memory, string>>(_.spec, "00000000-0000-0000-0000-000000000130", _.syntax.literal);

export type $ConfigObjectλShape = $.typeutil.flatten<_std.$BaseObjectλShape & {
}>;
type $ConfigObject = $.ObjectType<"cfg::ConfigObject", $ConfigObjectλShape, null, [
  ..._std.$BaseObject['__exclusives__'],
]>;
const $ConfigObject = $.makeType<$ConfigObject>(_.spec, "1edadadb-108a-11ee-bc73-b1c3c8b21982", _.syntax.literal);

const ConfigObject: $.$expr_PathNode<$.TypeSet<$ConfigObject, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($ConfigObject, $.Cardinality.Many), null);

export type $AbstractConfigλShape = $.typeutil.flatten<$ConfigObjectλShape & {
  "session_idle_timeout": $.PropertyDesc<_std.$duration, $.Cardinality.One, false, false, false, true>;
  "session_idle_transaction_timeout": $.PropertyDesc<_std.$duration, $.Cardinality.One, false, false, false, true>;
  "query_execution_timeout": $.PropertyDesc<_std.$duration, $.Cardinality.One, false, false, false, false>;
  "listen_port": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, true>;
  "listen_addresses": $.PropertyDesc<_std.$str, $.Cardinality.Many, false, false, false, false>;
  "auth": $.LinkDesc<$Auth, $.Cardinality.Many, {}, false, false,  false, false>;
  "allow_dml_in_functions": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, true>;
  "allow_bare_ddl": $.PropertyDesc<$AllowBareDDL, $.Cardinality.AtMostOne, false, false, false, true>;
  "apply_access_policies": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, true>;
  "allow_user_specified_id": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, true>;
  "shared_buffers": $.PropertyDesc<$memory, $.Cardinality.AtMostOne, false, false, false, false>;
  "query_work_mem": $.PropertyDesc<$memory, $.Cardinality.AtMostOne, false, false, false, false>;
  "maintenance_work_mem": $.PropertyDesc<$memory, $.Cardinality.AtMostOne, false, false, false, false>;
  "effective_cache_size": $.PropertyDesc<$memory, $.Cardinality.AtMostOne, false, false, false, false>;
  "effective_io_concurrency": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "default_statistics_target": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "force_database_error": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, true>;
  "_pg_prepared_statement_cache_size": $.PropertyDesc<_std.$int16, $.Cardinality.One, false, false, false, true>;
}>;
type $AbstractConfig = $.ObjectType<"cfg::AbstractConfig", $AbstractConfigλShape, null, [
  ...$ConfigObject['__exclusives__'],
]>;
const $AbstractConfig = $.makeType<$AbstractConfig>(_.spec, "1f1e56a8-108a-11ee-a0d0-279ebad1f256", _.syntax.literal);

const AbstractConfig: $.$expr_PathNode<$.TypeSet<$AbstractConfig, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($AbstractConfig, $.Cardinality.Many), null);

export type $AuthλShape = $.typeutil.flatten<$ConfigObjectλShape & {
  "priority": $.PropertyDesc<_std.$int64, $.Cardinality.One, true, false, true, false>;
  "user": $.PropertyDesc<_std.$str, $.Cardinality.Many, false, false, true, true>;
  "method": $.LinkDesc<$AuthMethod, $.Cardinality.AtMostOne, {}, true, false,  true, false>;
  "comment": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, true, false>;
  "<auth[is cfg::AbstractConfig]": $.LinkDesc<$AbstractConfig, $.Cardinality.Many, {}, false, false,  false, false>;
  "<auth[is cfg::Config]": $.LinkDesc<$Config, $.Cardinality.Many, {}, false, false,  false, false>;
  "<auth[is cfg::InstanceConfig]": $.LinkDesc<$InstanceConfig, $.Cardinality.Many, {}, false, false,  false, false>;
  "<auth[is cfg::DatabaseConfig]": $.LinkDesc<$DatabaseConfig, $.Cardinality.Many, {}, false, false,  false, false>;
  "<auth": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Auth = $.ObjectType<"cfg::Auth", $AuthλShape, null, [
  ...$ConfigObject['__exclusives__'],
  {priority: {__element__: _std.$int64, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {method: {__element__: $AuthMethod, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Auth = $.makeType<$Auth>(_.spec, "1f0a67ef-108a-11ee-850b-1d01a902b267", _.syntax.literal);

const Auth: $.$expr_PathNode<$.TypeSet<$Auth, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Auth, $.Cardinality.Many), null);

export type $AuthMethodλShape = $.typeutil.flatten<$ConfigObjectλShape & {
  "transports": $.PropertyDesc<$ConnectionTransport, $.Cardinality.Many, false, false, true, false>;
  "<method[is cfg::Auth]": $.LinkDesc<$Auth, $.Cardinality.AtMostOne, {}, true, false,  false, false>;
  "<method": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $AuthMethod = $.ObjectType<"cfg::AuthMethod", $AuthMethodλShape, null, [
  ...$ConfigObject['__exclusives__'],
]>;
const $AuthMethod = $.makeType<$AuthMethod>(_.spec, "1ee2eef5-108a-11ee-b75f-ff64c923fe88", _.syntax.literal);

const AuthMethod: $.$expr_PathNode<$.TypeSet<$AuthMethod, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($AuthMethod, $.Cardinality.Many), null);

export type $ConfigλShape = $.typeutil.flatten<$AbstractConfigλShape & {
}>;
type $Config = $.ObjectType<"cfg::Config", $ConfigλShape, null, [
  ...$AbstractConfig['__exclusives__'],
]>;
const $Config = $.makeType<$Config>(_.spec, "1f5b0cc5-108a-11ee-a206-c96e8aabc4fd", _.syntax.literal);

const Config: $.$expr_PathNode<$.TypeSet<$Config, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Config, $.Cardinality.Many), null);

export type $DatabaseConfigλShape = $.typeutil.flatten<$AbstractConfigλShape & {
}>;
type $DatabaseConfig = $.ObjectType<"cfg::DatabaseConfig", $DatabaseConfigλShape, null, [
  ...$AbstractConfig['__exclusives__'],
]>;
const $DatabaseConfig = $.makeType<$DatabaseConfig>(_.spec, "1fc355bf-108a-11ee-a40a-77e7cdda60d9", _.syntax.literal);

const DatabaseConfig: $.$expr_PathNode<$.TypeSet<$DatabaseConfig, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($DatabaseConfig, $.Cardinality.Many), null);

export type $InstanceConfigλShape = $.typeutil.flatten<$AbstractConfigλShape & {
}>;
type $InstanceConfig = $.ObjectType<"cfg::InstanceConfig", $InstanceConfigλShape, null, [
  ...$AbstractConfig['__exclusives__'],
]>;
const $InstanceConfig = $.makeType<$InstanceConfig>(_.spec, "1f8e1e06-108a-11ee-8b47-557adf5ca6c9", _.syntax.literal);

const InstanceConfig: $.$expr_PathNode<$.TypeSet<$InstanceConfig, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($InstanceConfig, $.Cardinality.Many), null);

export type $JWTλShape = $.typeutil.flatten<Omit<$AuthMethodλShape, "transports"> & {
  "transports": $.PropertyDesc<$ConnectionTransport, $.Cardinality.Many, false, false, true, true>;
}>;
type $JWT = $.ObjectType<"cfg::JWT", $JWTλShape, null, [
  ...$AuthMethod['__exclusives__'],
]>;
const $JWT = $.makeType<$JWT>(_.spec, "1effc00f-108a-11ee-8d3b-57595a180f49", _.syntax.literal);

const JWT: $.$expr_PathNode<$.TypeSet<$JWT, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($JWT, $.Cardinality.Many), null);

export type $SCRAMλShape = $.typeutil.flatten<Omit<$AuthMethodλShape, "transports"> & {
  "transports": $.PropertyDesc<$ConnectionTransport, $.Cardinality.Many, false, false, true, true>;
}>;
type $SCRAM = $.ObjectType<"cfg::SCRAM", $SCRAMλShape, null, [
  ...$AuthMethod['__exclusives__'],
]>;
const $SCRAM = $.makeType<$SCRAM>(_.spec, "1ef510ec-108a-11ee-b090-650975c9584f", _.syntax.literal);

const SCRAM: $.$expr_PathNode<$.TypeSet<$SCRAM, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SCRAM, $.Cardinality.Many), null);

export type $TrustλShape = $.typeutil.flatten<$AuthMethodλShape & {
}>;
type $Trust = $.ObjectType<"cfg::Trust", $TrustλShape, null, [
  ...$AuthMethod['__exclusives__'],
]>;
const $Trust = $.makeType<$Trust>(_.spec, "1eec0912-108a-11ee-95a5-737701ef72fb", _.syntax.literal);

const Trust: $.$expr_PathNode<$.TypeSet<$Trust, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Trust, $.Cardinality.Many), null);

type get_config_jsonλFuncExpr<
  NamedArgs extends {
    "sources"?: $.TypeSet<$.ArrayType<_std.$str>>,
    "max_source"?: _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  },
> = $.$expr_Function<
  _std.$json, $.cardutil.multiplyCardinalities<$.cardutil.optionalParamCardinality<NamedArgs["sources"]>, $.cardutil.optionalParamCardinality<NamedArgs["max_source"]>>
>;
function get_config_json<
  NamedArgs extends {
    "sources"?: $.TypeSet<$.ArrayType<_std.$str>>,
    "max_source"?: _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  },
>(
  namedArgs: NamedArgs,
): get_config_jsonλFuncExpr<NamedArgs>;
function get_config_json(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('cfg::get_config_json', args, _.spec, [
    {args: [], namedArgs: {"sources": {typeId: "1479b979-108a-11ee-986c-d33154d635df", optional: true, setoftype: false, variadic: false}, "max_source": {typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false}}, returnTypeId: "00000000-0000-0000-0000-00000000010f"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "cfg::get_config_json",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { AllowBareDDL, ConnectionTransport, memory, $ConfigObject, ConfigObject, $AbstractConfig, AbstractConfig, $Auth, Auth, $AuthMethod, AuthMethod, $Config, Config, $DatabaseConfig, DatabaseConfig, $InstanceConfig, InstanceConfig, $JWT, JWT, $SCRAM, SCRAM, $Trust, Trust };

type __defaultExports = {
  "AllowBareDDL": typeof AllowBareDDL;
  "ConnectionTransport": typeof ConnectionTransport;
  "memory": typeof memory;
  "ConfigObject": typeof ConfigObject;
  "AbstractConfig": typeof AbstractConfig;
  "Auth": typeof Auth;
  "AuthMethod": typeof AuthMethod;
  "Config": typeof Config;
  "DatabaseConfig": typeof DatabaseConfig;
  "InstanceConfig": typeof InstanceConfig;
  "JWT": typeof JWT;
  "SCRAM": typeof SCRAM;
  "Trust": typeof Trust;
  "get_config_json": typeof get_config_json
};
const __defaultExports: __defaultExports = {
  "AllowBareDDL": AllowBareDDL,
  "ConnectionTransport": ConnectionTransport,
  "memory": memory,
  "ConfigObject": ConfigObject,
  "AbstractConfig": AbstractConfig,
  "Auth": Auth,
  "AuthMethod": AuthMethod,
  "Config": Config,
  "DatabaseConfig": DatabaseConfig,
  "InstanceConfig": InstanceConfig,
  "JWT": JWT,
  "SCRAM": SCRAM,
  "Trust": Trust,
  "get_config_json": get_config_json
};
export default __defaultExports;
